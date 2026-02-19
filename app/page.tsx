import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const faqs = [
  ["Moet ik alles al weten over de baby?", "Nee, de flow werkt ook met minimale info en helpt je keuzes maken."],
  ["Is dit alleen voor beste vriendinnen?", "Voor iedereen die warm en persoonlijk wil geven, maar ja: besties voelen zich hier thuis."],
  ["Kan ik later opnieuw genereren?", "Ja, met één klik maak je nieuwe variaties vanuit hetzelfde profiel."]
];

export default function HomePage() {
  return (
    <div className="space-y-12 pt-8">
      <section className="glass rounded-[2rem] bg-gradient-to-br from-white/80 via-lilac/60 to-mint/60 p-10 md:p-16">
        <Badge>Premium baby gift studio</Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Maak een kraamcadeau dat voelt als liefde in beeld.</h1>
        <p className="mt-4 max-w-2xl text-slate-600">MrHutch helpt je met een warme chatflow en AI-concepten die perfect passen bij mama, baby en interieur.</p>
        <Link href="/create" className="mt-8 inline-block">
          <Button>Start je ontwerp</Button>
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {["Vertel in 2 minuten wie zij is", "Ontvang 4 premium stijlvariaties"].map((text, i) => (
          <Card key={text}>
            <p className="text-xs uppercase tracking-wide text-slate-500">Stap {i + 1}</p>
            <p className="mt-2 text-lg">{text}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Voor wie</h2>
        <Card className="text-slate-700">Voor beste vriendinnen, zussen, collega&apos;s en iedereen die een luxe maar zachte herinnering wil geven aan een nieuwe mama.</Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Voorbeelden</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="aspect-square animate-pulse bg-gradient-to-br from-blush to-lilac" aria-label="Voorbeeld placeholder" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <Card key={q}>
              <p className="font-medium">{q}</p>
              <p className="mt-1 text-sm text-slate-600">{a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
