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
