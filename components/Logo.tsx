import Image from "next/image";
import Link from "next/link";
import { ui } from "@/content/site";
import { cx } from "@/lib/cx";

/**
 * The single swap point for the logo.
 *
 * TODO 1: the mark below is a raster PNG extracted from the client's Google
 * Doc. When the designer supplies a vector SVG, replace `/public/logo-mark.png`
 * (or point `src` at the new file) and nothing else on the site changes.
 * The wordmark is rendered as live text so it stays crisp at every size and
 * matches the heading typeface.
 */
export function Logo({
  variant = "dark",
  className,
  priority = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const light = variant === "light";
  return (
    <Link
      href="/"
      className={cx("inline-flex items-center gap-3 rounded-lg", className)}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={694}
        height={606}
        priority={priority}
        sizes="52px"
        className="h-10 w-auto md:h-11"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-serif text-[1.3rem] tracking-tight md:text-[1.4rem]",
            light ? "text-cream" : "text-navy-700",
          )}
        >
          {ui.wordmark.line1}
        </span>
        <span className="sr-only"> </span>
        <span
          className={cx(
            "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em]",
            light ? "text-cream/85" : "text-navy-700",
          )}
        >
          {ui.wordmark.line2}
        </span>
      </span>
    </Link>
  );
}
