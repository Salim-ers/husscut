import Image from "next/image";
import Link from "next/link";
import emblem from "@/assets/brand/emblem.webp";
import wordmark from "@/assets/brand/wordmark.webp";

/**
 * Logotype horizontal composé des deux éléments fournis par HussCut (emblème taureau et
 * lettrage néon), sans redessin ni police de substitution.
 */
export function BrandLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className="flex shrink-0 items-center gap-2 rounded-lg py-1">
      <Image src={emblem} alt="" width={40} height={38} sizes="40px" className="h-[2.375rem] w-auto" preload />
      <Image src={wordmark} alt="" width={84} height={30} sizes="84px" className="h-[1.875rem] w-auto" preload />
    </Link>
  );
}
