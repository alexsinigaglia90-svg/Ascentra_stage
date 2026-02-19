export type PromptProfile = {
  vibe: string;
  style: string;
  colors: string;
  context: string;
  motherType: string;
  babyDetails: string;
  occasion: string;
  symbols: string;
  textPreference: string;
  roomMood: string;
  memories: string;
  mustAvoid: string;
  finalNote: string;
};

export type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  timestamp: string;
};

export type Creation = {
  id: string;
  createdAt: string;
  profile: PromptProfile;
  images: string[];
};
