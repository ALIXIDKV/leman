import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaInstagram, FaTelegram, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { LOGO_SRC } from "@/lib/brand";
import { SITE } from "@/lib/config";
import { waLink } from "@/lib/utils";

const SOCIALS = [
  { key: "instagram", label: "Instagram", hint: "Karya & update", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", hint: "Video pendek", Icon: FaTiktok },
  { key: "youtube", label: "YouTube", hint: "Channel Leman", Icon: FaYoutube },
  { key: "telegram", label: "Telegram", hint: "Chat & info", Icon: FaTelegram },
  { key: "twitter", label: "Twitter / X", hint: "@lemanmarket01", Icon: FaXTwitter },
  { key: "threads", label: "Threads", hint: "@leman.market", Icon: SiThreads },
  { key: "waChannel1", label: "Saluran WA", hint: "Testimoni", Icon: FaWhatsapp },
  { key: "waChannel2", label: "Saluran WA", hint: "Market", Icon: FaWhatsapp },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <SectionHeading eyebrow="Contact" title="Sosial Media &" accent="Kontak" description="Semua kanal resmi Leman." />

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* CTA WhatsApp */}
        <Reveal>
          <div className="glass-strong relative h-full overflow-hidden rounded-[2rem] p-7 sm:p-9">
            <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/30 blur-[80px]" />
            <FaWhatsapp className="absolute -bottom-6 -right-4 size-48 text-primary/10" aria-hidden="true" />
            <p className="relative text-sm font-semibold text-primary">Respon paling cepat</p>
            <h3 className="relative mt-3 max-w-sm text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
              Punya ide? <span className="font-serif font-normal italic text-primary">Chat</span> langsung.
            </h3>
            <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Tanya produk, minta desain logo, atau konsultasi kebutuhan digital kamu lewat WhatsApp.</p>
            <Button asChild size="lg" className="relative mt-8">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="!size-5" />
                Chat WhatsApp
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </Reveal>

        {/* sosial */}
        <div className="grid grid-cols-2 gap-3">
          {SOCIALS.map(({ key, label, hint, Icon }, i) => (
            <Reveal key={key} delay={i * 0.05} y={20}>
              <motion.a
                href={SITE.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="glass group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-4 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_20px_44px_-22px_hsl(var(--primary)/0.5)]"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-foreground/[0.07] text-xl text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_8px_24px_-4px_hsl(var(--primary)/0.7)]">
                    <Icon />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">{label}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-4">
        <figure className="glass flex items-center gap-5 rounded-[2rem] p-5 sm:p-6">
          <img src={LOGO_SRC} alt="" className="size-16 shrink-0 rounded-full object-cover object-[50%_25%] ring-1 ring-primary/40 sm:size-20" />
          <blockquote className="font-serif text-2xl italic leading-snug sm:text-3xl">
            “Terus berkarya, terus berkembang.”
            <footer className="mt-1.5 font-sans text-xs not-italic text-muted-foreground">— Leman Market</footer>
          </blockquote>
        </figure>
      </Reveal>
    </section>
  );
}
