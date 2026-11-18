import Image from "next/image";
import Link from "next/link";
import emblem from "@/assets/brand/emblem.webp";
import wordmark from "@/assets/brand/wordmark.webp";

/**
 * Logotype horizontal composé des deux éléments fournis par HussCut (emblème taureau et
 * lettrage néon), sans redessin ni police de substitution. Sur très petit écran, l'emblème seul.
 */
export function BrandLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="group flex shrink-0 items-center gap-2 rounded-lg py-1">
      <Image
        src={emblem}
        alt=""
        width={40}
        height={38}
        sizes="40px"
        className="h-[2.375rem] w-auto transition-transform duration-500 ease-[var(--ease-soft)] group-hover:-rotate-6 lg:h-[2.625rem]"
        preload
      />
      <Image src={wordmark} alt="" width={84} height={30} sizes="96px" className="h-[1.875rem] w-auto max-[379px]:hidden lg:h-[2.125rem]" preload />
    </Link>
  );
}
