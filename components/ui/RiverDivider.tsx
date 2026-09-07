import { cx } from "@/lib/cx";

/**
 * The one decorative motif: a river curve echoing the logo.
 * "bleed" is the tall ribbon that runs down the right edge of the hero.
 * "divider" is a thin horizontal wave between sections.
 * Use at most three times on the page (brief, section 4).
 */
export function RiverDivider({
  variant = "divider",
  className,
}: {
  variant?: "bleed" | "divider";
  className?: string;
}) {
  if (variant === "bleed") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 400 900"
        preserveAspectRatio="xMidYMid slice"
        className={cx("text-river-300", className)}
      >
        <path
          fill="currentColor"
          fillOpacity="0.16"
          d="M214 0c-70 130 60 230 10 370-52 146 96 246 40 400l-14 130h88c62-160-90-256-36-408 52-146-80-244-6-382L282 0h-68Z"
        />
        <path
          fill="currentColor"
          fillOpacity="0.1"
          d="M130 0c-40 110 40 200 0 320-42 126 70 210 30 360-20 78-40 150-60 220h64c22-70 44-142 66-220 44-152-70-236-24-364 42-116-34-206 4-316h-80Z"
        />
      </svg>
    );
  }

  return (
    <div aria-hidden="true" className={cx("pointer-events-none w-full", className)}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-10 w-full text-river-300 md:h-14"
        focusable="false"
      >
        <path
          fill="currentColor"
          fillOpacity="0.45"
          d="M0 44c180-36 300 36 480 8s300-40 480-8 300 40 480 4v8c-180 36-300-36-480-4s-300 40-480 8S180 16 0 52v-8Z"
        />
      </svg>
    </div>
  );
}
