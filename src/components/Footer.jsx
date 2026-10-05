import { ArrowUp } from "lucide-react";
import { LOGO_SRC } from "@/lib/brand";
import { SITE } from "@/lib/config";
import { waLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pb-32 pt-6">
      <div className="flex flex-col items-center justify-between gap-5 border-t border-border/10 pt-8 text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={LOGO_SRC} alt="" className="size-8 rounded-full object-cover object-[50%_25%] ring-1 ring-foreground/15" />
          <p>
            © {new Date().getFullYear()} {SITE.siteName} — {SITE.tagline}
          </p>
        </div>
        <nav className="flex items-center gap-5">
          <a className="transition-colors hover:text-primary" href={waLink()} target="_blank" rel="noopener noreferrer">
            Chat via WhatsApp
          </a>
          <a className="transition-colors hover:text-foreground" href="/admin.html">
            Admin
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Kembali ke atas"
            className="grid size-8 place-items-center rounded-full bg-foreground/[0.06] transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowUp className="size-4" />
          </button>
        </nav>
      </div>
    </footer>
  );
}
