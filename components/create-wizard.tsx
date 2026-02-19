"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { EMPTY_PROFILE, QUESTION_FLOW } from "@/lib/chatbot";
import { buildImagePrompts } from "@/lib/prompt-builder";
import { saveCreation } from "@/lib/storage";
import { ChatMessage, PromptProfile } from "@/lib/types";

const now = () => new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });

export function CreateWizard() {
  const toast = useToast();
  const [phase, setPhase] = useState<1 | 2>(1);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<PromptProfile>(EMPTY_PROFILE);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hey lieverd, wat mooi dat je iets speciaals voor haar wilt maken ✨ Laten we samen beginnen.", timestamp: now() },
    { role: "assistant", content: QUESTION_FLOW[0].question, timestamp: now() }
  ]);

  const [controls, setControls] = useState({ softness: 70, detail: 45, temperature: 55, render: 35 });
  const [images, setImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [typing, setTyping] = useState(false);

  const askNext = async (answer: string) => {
    const q = QUESTION_FLOW[index];
    const nextProfile = { ...profile, [q.key]: answer };
    setProfile(nextProfile);
    setMessages((m) => [...m, { role: "user", content: answer, timestamp: now() }]);

    const nextIndex = index + 1;
    if (nextIndex >= QUESTION_FLOW.length) {
      setMessages((m) => [...m, { role: "assistant", content: "Perfect. Je profiel is compleet. Ik ga magie maken in 4 premium concepten.", timestamp: now() }]);
      setPhase(2);
      setIndex(nextIndex);
      generateImages(nextProfile);
      return;
    }

    setIndex(nextIndex);
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [...messages, { role: "user", content: answer }].slice(-6).map((m) => ({ role: m.role, content: m.content }))
        })
      });
      const data = (await res.json()) as { reply?: string };
      if (data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply!, timestamp: now() }]);
      }
    } catch {
      // silent fallback to scripted flow
    } finally {
      setTyping(false);
      setMessages((m) => [...m, { role: "assistant", content: QUESTION_FLOW[nextIndex].question, timestamp: now() }]);
    }
  };

  const generateImages = async (profileData = profile) => {
    setLoadingImages(true);
    try {
      const prompts = buildImagePrompts(profileData, controls);
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profileData, controls, prompts })
      });
      const data = (await res.json()) as { images: string[] };
      setImages(data.images || []);
    } catch {
      toast.push("Kon niet genereren, probeer opnieuw.");
    } finally {
      setLoadingImages(false);
    }
  };

  const onSend = async () => {
    if (!input.trim()) return;
    const answer = input;
    setInput("");
    await askNext(answer);
  };

  const summary = useMemo(
    () =>
      QUESTION_FLOW.map((q) => ({ label: q.key, value: profile[q.key] || "—" })),
    [profile]
  );

  return (
    <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
      {phase === 1 ? (
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Fase 1 · Warme intake chat</h2>
          <div className="h-[420px] space-y-3 overflow-y-auto rounded-2xl bg-white/40 p-3">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.role === "assistant" ? "bg-white" : "ml-auto bg-ink text-white"}`}>
                <p>{msg.content}</p>
                <p className={`mt-1 text-[10px] ${msg.role === "assistant" ? "text-slate-400" : "text-white/70"}`}>{msg.timestamp}</p>
              </div>
            ))}
            <AnimatePresence>
              {typing ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-slate-500">
                  MrHutch typt...
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={QUESTION_FLOW[index]?.placeholder || "Vertel gerust verder..."}
              aria-label="Chat antwoord"
              onKeyDown={(e) => e.key === "Enter" && onSend()}
            />
            <Button onClick={onSend}>Verstuur</Button>
          </div>
        </Card>
      ) : (
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Fase 2 · Concept generator</h2>
          <p className="text-sm text-slate-600">Creating magic... we maken 4 variaties die precies goed voelen.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {loadingImages
              ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white/60" />)
              : images.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image src={src} alt={`Concept ${i + 1}`} fill className="object-cover" loading="lazy" />
                  </div>
                ))}
          </div>
          <div className="grid gap-2">
            {[
              ["Zachtheid", "softness"],
              ["Minimal ↔ Detail", "detail"],
              ["Pastel koel ↔ Pastel warm", "temperature"],
              ["Illustratief ↔ Soft 3D", "render"]
            ].map(([label, key]) => (
              <label key={key} className="text-sm">
                {label}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={controls[key as keyof typeof controls]}
                  onChange={(e) => setControls((c) => ({ ...c, [key]: Number(e.target.value) }))}
                  className="w-full"
                />
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => generateImages()}>Genereer (opnieuw)</Button>
            <Button variant="secondary" onClick={() => generateImages()}>
              Maak 4 variaties
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                saveCreation({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), profile, images });
                toast.push("Opgeslagen in je gallery 💫");
              }}
            >
              Bewaar in gallery
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (images[0]) window.open(images[0], "_blank");
              }}
            >
              Download
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="mb-3 text-lg font-semibold">Profile Summary</h3>
        <div className="space-y-2 text-sm">
          {summary.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/70 p-2">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        {phase === 2 && (
          <pre className="mt-4 overflow-auto rounded-2xl bg-white/70 p-3 text-xs">{JSON.stringify(profile, null, 2)}</pre>
        )}
      </Card>
    </div>
  );
}
