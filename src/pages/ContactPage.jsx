import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaTelegram, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SITE } from "@/lib/config";
import { waLink } from "@/lib/utils";

const MAIN = [
  { label: "Instagram", hint: "Karya & update", Icon: FaInstagram, href: SITE.social.instagram },
  { label: "Telegram", hint: "Chat & info", Icon: FaTelegram, href: SITE.social.telegram },
  { label: "WhatsApp", hint: "Respon tercepat", Icon: FaWhatsapp, href: waLink() },
  { label: "Email", hint: SITE.email || "Segera hadir", Icon: MdEmail, href: SITE.email ? `mailto:${SITE.email}` : null },
];
const MORE = [
  { label: "TikTok", Icon: FaTiktok, href: SITE.social.tiktok },
  { label: "YouTube", Icon: FaYoutube, href: SITE.social.youtube },
  { label: "X", Icon: FaXTwitter, href: SITE.social.twitter },
  { label: "Saluran WA (testimoni)", Icon: FaWhatsapp, href: SITE.social.waChannel1 },
  { label: "Saluran WA (market)", Icon: FaWhatsapp, href: SITE.social.waChannel2 },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12 text-center sm:py-20">
      <span className="eyebrow">Contact</span>
      <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
        Let&apos;s work <span className="font-serif font-normal italic text-primary">together</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">Punya ide, butuh desain, atau mau order produk digital? Pilih kanal favoritmu.</p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
        {MAIN.map(({ label, hint, Icon, href }, i) => {
          const Comp = href ? motion.a : motion.div;
          return (
            <Comp
              key={label}
              {...(href ? { href, target: href.startsWith("mailto") ? undefined : "_blank", rel: "noopener noreferrer" } : {})}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              whileHover={href ? { y: -6 } : undefined}
              whileTap={href ? { scale: 0.97 } : undefined}
              className="glass group relative flex flex-col items-center gap-3 overflow-hidden rounded-[2rem] px-4 py-8 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_hsl(var(--primary)/0.5)]"
            >
              <span className="grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:size-20">
                <Icon className="size-8 sm:size-10" />
              </span>
              <span>
                <span className="block text-base font-bold">{label}</span>
                <span className="mt-0.5 block max-w-full truncate text-xs text-muted-foreground">{hint}</span>
              </span>
              {href && <ArrowUpRight className="absolute right-4 top-4 size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />}
            </Comp>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {MORE.map(({ label, Icon, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="glass grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary">
            <Icon className="size-[18px]" />
          </a>
        ))}
      </div>
    </section>
  );
}
