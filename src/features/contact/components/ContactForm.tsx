"use client";

import { type ChangeEvent, type FormEvent, type ReactNode, useActionState, useEffect, useId, useRef, useState } from "react";
import { AlertIcon, CheckIcon, CloseIcon, CopyIcon, MessageIcon, PhoneIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/typography";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { type ContactActionState, sendContactRequest } from "../actions/send-contact-request";
import { composeRequestText, smsHref } from "../lib/compose-message";
import { type ContactTopic, contactTopics, isContactTopic } from "../lib/topics";
import {
  type ContactField,
  type FieldErrors,
  MESSAGE_MAX,
  PEOPLE_MAX,
  PEOPLE_MIN,
  parisToday,
  validateContact,
} from "../schemas/contact-schema";

type FormCopy = Dictionary["contact"]["form"];

interface ContactFormProps {
  locale: Locale;
  /** « sms » tant que l'envoi e-mail n'est pas configuré côté serveur. */
  mode: "sms" | "email";
  copy: FormCopy;
  phone: { e164: string; display: string };
  callLabel: string;
  /** Noms des produits dans la langue courante, pour le préremplissage depuis le catalogue. */
  productNames: Record<string, string>;
  /** Objet coché par défaut (sans paramètre ?topic dans l'adresse). */
  defaultTopic?: ContactTopic;
}

interface Values {
  name: string;
  replyTo: string;
  topic: ContactTopic;
  item: string;
  people: string;
  date: string;
  message: string;
}

const FIELD_ORDER: ContactField[] = ["name", "replyTo", "topic", "people", "date", "message"];

const initialValues: Values = { name: "", replyTo: "", topic: "question", item: "", people: "", date: "", message: "" };

export function ContactForm({ locale, mode: initialMode, copy, phone, callLabel, productNames, defaultTopic = "question" }: ContactFormProps) {
  const uid = useId();
  const [mode, setMode] = useState(initialMode);
  const [values, setValues] = useState<Values>({ ...initialValues, topic: defaultTopic });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState(false);
  const [smsText, setSmsText] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [session, setSession] = useState<{ today: string; startedAt: number; requestId: string } | null>(null);
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(sendContactRequest, { status: "idle" });

  const fieldRefs = useRef<Partial<Record<ContactField, HTMLElement | null>>>({});
  const readyHeading = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Préremplissage depuis le catalogue (?topic=availability&item=…) et horodatage de session.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    const item = params.get("item");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique de l'URL après hydratation (page statique)
    setValues((current) => ({
      ...current,
      topic: isContactTopic(topic) ? topic : current.topic,
      item: item && productNames[item] ? item : "",
    }));
    setSession({ today: parisToday(), startedAt: Date.now(), requestId: crypto.randomUUID() });
  }, [productNames]);

  useEffect(() => {
    if (smsText) readyHeading.current?.focus();
  }, [smsText]);

  useEffect(() => {
    if (state.status === "sent" || state.status === "failed" || state.status === "rateLimited") resultRef.current?.focus();
  }, [state]);

  const shownErrors: FieldErrors = Object.keys(errors).length > 0 ? errors : state.status === "invalid" ? state.errors : {};

  function update(field: keyof Values) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((current) => ({ ...current, [field]: value }));
      if (errors[field as ContactField]) setErrors((current) => ({ ...current, [field]: undefined }));
      // Nouvelle clé d'idempotence dès que la demande change.
      setSession((current) => (current ? { ...current, requestId: crypto.randomUUID() } : current));
    };
  }

  function validate() {
    return validateContact(values, {
      requireReplyTo: mode === "email",
      today: session?.today ?? parisToday(),
      isKnownItem: (id) => id in productNames,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validate();
    if (!result.success) {
      event.preventDefault();
      setErrors(result.errors);
      setSummary(true);
      const first = FIELD_ORDER.find((field) => result.errors[field]);
      if (first) fieldRefs.current[first]?.focus();
      return;
    }
    setErrors({});
    setSummary(false);
    if (mode === "sms") {
      event.preventDefault();
      setCopyState("idle");
      setSmsText(
        composeRequestText(result.data, {
          locale,
          copy: { ...copy.sms, topics: copy.topics },
          productName: result.data.item ? productNames[result.data.item] : undefined,
        }),
      );
    }
    // Mode e-mail : l'action serveur prend le relais (validation refaite côté serveur).
  }

  async function copyMessage() {
    if (!smsText) return;
    try {
      await navigator.clipboard.writeText(smsText);
      setCopyState("copied");
    } catch {
      setCopyState(legacyCopy(smsText) ? "copied" : "failed");
    }
  }

  const describedBy = (field: ContactField, hint?: string) =>
    [shownErrors[field] ? `${uid}-${field}-error` : null, hint].filter(Boolean).join(" ") || undefined;

  /* ---- SMS prêt ------------------------------------------------------------ */
  if (mode === "sms" && smsText) {
    return (
      <div className="flex flex-col gap-5" role="region" aria-labelledby={`${uid}-ready`}>
        <div className="flex items-start gap-3">
          <span className="mt-1 inline-flex size-8 flex-none items-center justify-center rounded-full bg-ink text-ivory">
            <CheckIcon />
          </span>
          <div>
            <h3 id={`${uid}-ready`} ref={readyHeading} tabIndex={-1} className="display-3 focus:outline-none">
              {copy.ready.title}
            </h3>
            <p className="mt-2 text-mute-ink">{copy.ready.text}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">{format(copy.ready.preview, { phone: phone.display })}</p>
          <pre data-sms-preview className="mt-2 rounded-[14px] border border-ink/15 bg-paper p-4 font-sans text-[0.9875rem] whitespace-pre-wrap select-all">
            {smsText}
          </pre>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={smsHref(phone.e164, smsText)} className="btn btn-primary" data-sms-link>
            <MessageIcon />
            {copy.ready.open}
          </a>
          <button type="button" className="btn btn-secondary" onClick={copyMessage}>
            <CopyIcon />
            {copy.ready.copy}
          </button>
          <a href={`tel:${phone.e164}`} className="btn btn-secondary">
            <PhoneIcon />
            {callLabel}
          </a>
        </div>
        <p aria-live="polite" className="min-h-6 text-[0.9375rem] font-medium">
          {copyState === "copied" ? format(copy.ready.copied, { phone: phone.display }) : copyState === "failed" ? copy.ready.copyFailed : ""}
        </p>
        <p className="hidden text-sm text-mute-ink [@media(hover:hover)_and_(pointer:fine)]:block">{copy.ready.desktopHint}</p>
        <button type="button" className="link-quiet self-start" onClick={() => setSmsText(null)}>
          {copy.ready.edit}
        </button>
      </div>
    );
  }

  /* ---- E-mail envoyé -------------------------------------------------------- */
  if (mode === "email" && state.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="flex items-start gap-3 focus:outline-none">
        <span className="mt-1 inline-flex size-8 flex-none items-center justify-center rounded-full bg-ink text-ivory">
          <CheckIcon />
        </span>
        <p className="lede">{copy.result.sent}</p>
      </div>
    );
  }

  const failure = mode === "email" && (state.status === "failed" || state.status === "rateLimited") ? state.status : null;
  const productName = values.topic === "availability" && values.item ? productNames[values.item] : null;
  const messageLeft = MESSAGE_MAX - values.message.length;

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" aria-describedby={`${uid}-intro`}>
      <p id={`${uid}-intro`} className="text-mute-ink">
        {mode === "sms" ? copy.smsIntro : copy.emailIntro}
      </p>

      {summary && Object.keys(shownErrors).length > 0 ? (
        <p role="alert" className="field-error rounded-[12px] border border-bordeaux/40 bg-bordeaux/5 p-3">
          <AlertIcon className="mt-0.5 flex-none" />
          {copy.errorSummary}
        </p>
      ) : null}

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={session?.startedAt ?? ""} />
      <input type="hidden" name="requestId" value={session?.requestId ?? ""} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Field id={`${uid}-name`} label={copy.name} flag={copy.required} error={shownErrors.name && copy.errors[shownErrors.name]} errorId={`${uid}-name-error`}>
        <input
          ref={(node) => {
            fieldRefs.current.name = node;
          }}
          id={`${uid}-name`}
          name="name"
          type="text"
          className="field"
          autoComplete="name"
          maxLength={120}
          required
          aria-required="true"
          aria-invalid={shownErrors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          value={values.name}
          onChange={update("name")}
        />
      </Field>

      {mode === "email" ? (
        <Field
          id={`${uid}-replyTo`}
          label={copy.replyTo}
          flag={copy.required}
          error={shownErrors.replyTo && copy.errors[shownErrors.replyTo]}
          errorId={`${uid}-replyTo-error`}
        >
          <input
            ref={(node) => {
              fieldRefs.current.replyTo = node;
            }}
            id={`${uid}-replyTo`}
            name="replyTo"
            type="text"
            inputMode="email"
            className="field"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={shownErrors.replyTo ? true : undefined}
            aria-describedby={describedBy("replyTo")}
            value={values.replyTo}
            onChange={update("replyTo")}
          />
        </Field>
      ) : null}

      <fieldset
        ref={(node) => {
          fieldRefs.current.topic = node;
        }}
        tabIndex={-1}
        className="focus:outline-none"
        aria-describedby={shownErrors.topic ? `${uid}-topic-error` : undefined}
      >
        <legend className="field-label">
          {copy.topicLegend} <span className="field-flag">({copy.required})</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {contactTopics.map((topic) => (
            <label key={topic} className="choice">
              <input type="radio" name="topic" value={topic} checked={values.topic === topic} onChange={update("topic")} />
              <span className="text-[0.9875rem] leading-snug font-medium">{copy.topics[topic]}</span>
            </label>
          ))}
        </div>
        {shownErrors.topic ? (
          <p id={`${uid}-topic-error`} className="field-error">
            <AlertIcon className="mt-0.5 flex-none" />
            {copy.errors[shownErrors.topic]}
          </p>
        ) : null}
      </fieldset>

      {productName ? (
        <div className="flex items-center justify-between gap-3 rounded-[14px] border border-ink/15 bg-paper py-2 pr-2 pl-4" data-prefilled-product>
          <p className="flex flex-col">
            <span className="text-sm text-mute-ink">{copy.product}</span>
            <span className="font-display text-xl leading-tight font-semibold">{productName}</span>
          </p>
          <input type="hidden" name="item" value={values.item} />
          <button
            type="button"
            className="inline-flex size-11 flex-none items-center justify-center rounded-[12px] hover:bg-ink/5"
            aria-label={`${copy.removeProduct} : ${productName}`}
            onClick={() => setValues((current) => ({ ...current, item: "" }))}
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}

      {values.topic === "platter" ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={`${uid}-people`} label={copy.people} flag={copy.optional} error={shownErrors.people && copy.errors[shownErrors.people]} errorId={`${uid}-people-error`}>
            <input
              ref={(node) => {
                fieldRefs.current.people = node;
              }}
              id={`${uid}-people`}
              name="people"
              type="number"
              inputMode="numeric"
              min={PEOPLE_MIN}
              max={PEOPLE_MAX}
              className="field"
              aria-invalid={shownErrors.people ? true : undefined}
              aria-describedby={describedBy("people")}
              value={values.people}
              onChange={update("people")}
            />
          </Field>
          <Field id={`${uid}-date`} label={copy.date} flag={copy.optional} error={shownErrors.date && copy.errors[shownErrors.date]} errorId={`${uid}-date-error`}>
            <input
              ref={(node) => {
                fieldRefs.current.date = node;
              }}
              id={`${uid}-date`}
              name="date"
              type="date"
              min={session?.today}
              className="field"
              aria-invalid={shownErrors.date ? true : undefined}
              aria-describedby={describedBy("date")}
              value={values.date}
              onChange={update("date")}
            />
          </Field>
        </div>
      ) : null}

      <Field id={`${uid}-message`} label={copy.message} flag={copy.required} error={shownErrors.message && copy.errors[shownErrors.message]} errorId={`${uid}-message-error`}>
        <textarea
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          id={`${uid}-message`}
          name="message"
          className="field"
          rows={5}
          maxLength={MESSAGE_MAX}
          required
          aria-required="true"
          aria-invalid={shownErrors.message ? true : undefined}
          aria-describedby={describedBy("message", `${uid}-message-hint`)}
          placeholder={copy.placeholders[values.topic]}
          value={values.message}
          onChange={update("message")}
        />
        <p id={`${uid}-message-hint`} className="field-hint">
          {format(copy.messageHint, { n: messageLeft })}
        </p>
      </Field>

      {failure ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="field-error flex-col rounded-[12px] border border-bordeaux/40 bg-bordeaux/5 p-4 focus:outline-none">
          <p className="flex gap-2">
            <AlertIcon className="mt-0.5 flex-none" />
            {failure === "rateLimited" ? copy.result.rateLimited : copy.result.failed}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button type="button" className="link-quiet" onClick={() => setMode("sms")}>
              {copy.result.fallbackSms}
            </button>
            <a href={`tel:${phone.e164}`} className="link-quiet">
              {callLabel}
            </a>
          </div>
        </div>
      ) : null}

      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" aria-busy={pending || undefined} disabled={pending}>
          {pending ? <span className="spinner" aria-hidden="true" /> : mode === "sms" ? <MessageIcon /> : null}
          {pending ? copy.sending : mode === "sms" ? copy.submitSms : copy.submitEmail}
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, flag, error, errorId, children }: { id: string; label: string; flag: string; error?: string; errorId: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} <span className="field-flag">({flag})</span>
      </label>
      {children}
      {error ? (
        <p id={errorId} className="field-error">
          <AlertIcon className="mt-0.5 flex-none" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Copie de secours pour les navigateurs sans API Clipboard (contexte non sécurisé, anciens WebView). */
function legacyCopy(text: string): boolean {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}
