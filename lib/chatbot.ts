import { PromptProfile } from "@/lib/types";

export const QUESTION_FLOW: Array<{ key: keyof PromptProfile; question: string; placeholder: string }> = [
  { key: "vibe", question: "Wat voor gevoel mag dit cadeau meteen geven?", placeholder: "lief, dromerig, rustig..." },
  { key: "style", question: "Welke beeldstijl past bij haar?", placeholder: "minimal, waterverf, soft 3D..." },
  { key: "colors", question: "Welke pastelkleuren passen het best?", placeholder: "poederroze, saliegroen, zand..." },
  { key: "context", question: "Waar komt de creatie te hangen of te staan?", placeholder: "kinderkamer, woonkamer..." },
  { key: "motherType", question: "Hoe zou je haar stijl als mama omschrijven?", placeholder: "stijlvol, zacht, modern..." },
  { key: "babyDetails", question: "Zijn er babydetails die je subtiel wilt terugzien?", placeholder: "sterrenbeeld, geboortemaand..." },
  { key: "occasion", question: "Voor welk moment is dit cadeau?", placeholder: "geboorte, kraamweek, babyshower" },
  { key: "symbols", question: "Wil je bepaalde symbolen of elementen?", placeholder: "maan, teddy, wolkjes..." },
  { key: "textPreference", question: "Moet er tekst in het beeld komen?", placeholder: "geen tekst, initiaal, quote..." },
  { key: "roomMood", question: "Hoe voelt haar interieur aan?", placeholder: "licht, Scandinavisch, warm..." },
  { key: "memories", question: "Is er een herinnering die het extra persoonlijk maakt?", placeholder: "eerste knuffel, lievelingsliedje..." },
  { key: "mustAvoid", question: "Wat wil je zeker vermijden?", placeholder: "te druk, felle kleuren..." },
  { key: "finalNote", question: "Laatste wens: wanneer is het voor jou perfect?", placeholder: "als ze moet glimlachen zodra ze het ziet..." }
];

export const EMPTY_PROFILE: PromptProfile = Object.fromEntries(
  QUESTION_FLOW.map((q) => [q.key, ""])
) as PromptProfile;
