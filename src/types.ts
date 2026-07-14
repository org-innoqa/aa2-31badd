export interface Character {
  id: number
  slug: string
  name: string
  title: string
  era: string
  description: string
  color_from: string
  color_to: string
  created_at?: string
  /** Optional per-figure prompt from the DB. Appended to the base persona prompt, never
   *  replaces it — substituting it would let a bad row drop the anti-coding guardrail. */
  system_prompt?: string
}

export interface CurrentUser {
  id: number
  username: string
}

export interface ChatMessage {
  id: number
  conversation_id: number
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Conversation {
  id: number
  character_id: number
  user_id: number | null
  guest_id: string | null
  created_at: string
}
