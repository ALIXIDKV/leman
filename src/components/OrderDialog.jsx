import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Form, Input, Modal } from "antd";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/lib/icons";
import { logOrder } from "@/lib/storage";
import { formatRupiah, waLink } from "@/lib/utils";

function SuccessCheck() {
  return (
    <svg viewBox="0 0 100 100" className="size-24" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="44" opacity=".25" />
      <motion.circle cx="50" cy="50" r="44" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      <motion.path d="M28 52 L44 68 L74 34" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }} />
    </svg>
  );
}

export default function OrderDialog({ open, product, category, onClose }) {
  const [form] = Form.useForm();
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (open) {
      form.resetFields();
      setDone(false);
    }
    return () => window.clearTimeout(timer.current);
  }, [open, form]);

  if (!product || !category) {
    return <Modal open={false} footer={null} />;
  }

  const priceText = product.price ? formatRupiah(product.price) : product.note || "chat WA";

  const onFinish = ({ name, contact, username }) => {
    let msg = `Halo Leman, saya mau order:\n"${product.name}" (${category.name}) — ${priceText}`;
    if (name?.trim()) msg += `\nNama: ${name.trim()}`;
    msg += `\nKontak: ${contact.trim()}`;
    if (category.isPanel && username?.trim()) msg += `\nUsername panel: ${username.trim()}`;

    logOrder({ product: product.name, category: category.name, price: priceText, name: name?.trim() || "", contact: contact.trim(), username: username?.trim() || "" });
    // dibuka langsung di dalam aksi klik user supaya tidak diblokir popup blocker (terutama Safari iOS)
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setDone(true);
    timer.current = window.setTimeout(onClose, 2400);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={440}
      rootClassName="order-modal"
      styles={{ mask: { background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" } }}
      title={null}
    >
      {done ? (
        <div className="grid justify-items-center gap-4 py-8 text-center">
          <SuccessCheck />
          <div>
            <p className="text-lg font-bold">Pesanan diteruskan</p>
            <p className="mt-1 text-sm text-muted-foreground">Melanjutkan "{product.name}" ke WhatsApp…</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 pr-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
              <CategoryIcon icon={category.icon} className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">{category.name}</p>
              <h3 className="truncate text-xl font-bold leading-tight">{product.name}</h3>
              <p className="text-sm font-semibold text-muted-foreground">{product.price ? formatRupiah(product.price) : "Chat WA untuk harga"}</p>
            </div>
          </div>

          <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} className="mt-6" autoComplete="on">
            <Form.Item label="Nama kamu" name="name">
              <Input placeholder="Contoh: Budi" autoComplete="name" />
            </Form.Item>
            <Form.Item
              label="Nomor WhatsApp (wajib)"
              name="contact"
              extra="Dipakai sebagai identitas kamu di chat Leman."
              rules={[
                { required: true, message: "Nomor WhatsApp wajib diisi" },
                { pattern: /^\+?[0-9\s-]{8,16}$/, message: "Masukkan nomor yang valid, mis. 0812xxxxxxx" },
              ]}
            >
              <Input type="tel" inputMode="tel" placeholder="0812xxxxxxx" autoComplete="tel" />
            </Form.Item>
            {category.isPanel && (
              <Form.Item label="Username untuk akun panel" name="username" extra="Dipakai untuk login ke panel setelah pesanan diproses.">
                <Input placeholder="contoh: budi123" autoCapitalize="none" />
              </Form.Item>
            )}
            <Button type="submit" size="lg" className="mt-2 w-full">
              <FaWhatsapp className="!size-5" />
              Lanjutkan ke WhatsApp
            </Button>
          </Form>
        </>
      )}
    </Modal>
  );
}
