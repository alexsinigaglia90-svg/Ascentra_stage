import { PromptProfile } from "./types";

export const CHAT_SYSTEM_PROMPT = `Je bent de warme, empathische assistent van MrHutch. Je spreekt Nederlands, kort en liefdevol.
Doel: stap voor stap informatie verzamelen voor een kraamcadeau afbeelding.
Regels:
- Stel 1 vraag tegelijk, met zachte toon.
- Geen medische, gevoelige of invasieve vragen.
- Geen technische AI-termen.
- Moedig positief aan en vat af en toe samen.
- Na voldoende info lever je een compact Prompt Profile in JSON.`;

const baseSignature =
  "MrHutch signature style: calm luxury, minimal compositie, high-end zachte belichting, pastel baby/kraamcadeau esthetiek, elegante whitespace, geen schreeuwerige kleuren, geen rommel.";

const conceptPresets = [
  "concept 1: dreamy watercolor illustration met subtiele papiertextuur",
  "concept 2: soft 3D render met fluweelzachte materialen en afgeronde vormen",
  "concept 3: minimal line-art met premium editorial compositie",
  "concept 4: serene nursery scene met verfijnde styling en pastel lagen"
];

export function buildImagePrompts(profile: PromptProfile, controls: Record<string, number>) {
  const profileText = Object.entries(profile)
    .map(([key, value]) => `${key}: ${value || "n.v.t."}`)
    .join(", ");

  return conceptPresets.map(
    (concept) =>
      `${baseSignature} ${concept}. Prompt profile: ${profileText}. Control values: softness ${controls.softness}, detail ${controls.detail}, temperature ${controls.temperature}, render mix ${controls.render}.`
  );
}
