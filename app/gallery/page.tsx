"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Creation } from "@/lib/types";
import { getCreations } from "@/lib/storage";

export default function GalleryPage() {
  const [items, setItems] = useState<Creation[]>([]);
  const [active, setActive] = useState<Creation | null>(null);

  useEffect(() => {
    setItems(getCreations());
  }, []);

  return (
    <div className="space-y-5 pt-6">
      <h1 className="text-3xl font-semibold">Jouw gallery</h1>
      <p className="text-sm text-slate-600">Lokaal opgeslagen creaties op dit apparaat.</p>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} onClick={() => setActive(item)} className="text-left">
            <Card>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                {item.images[0] ? <Image src={item.images[0]} alt="Creatie" fill className="object-cover" /> : null}
              </div>
              <p className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString("nl-NL")}</p>
            </Card>
          </button>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title="Creatie detail">
        {active?.images.map((src, i) => (
          <a key={i} href={src} target="_blank" rel="noreferrer" className="mb-2 block text-sm underline">
            Download concept {i + 1}
          </a>
        ))}
      </Modal>
    </div>
  );
}
