import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Send, User as UserIcon } from 'lucide-react'
import { Character, ChatMessage, CurrentUser } from '../types'
import { db } from '../lib/db'
import { getGuestId } from '../lib/session'
import { generateResponse, getGreeting } from '../lib/aiEngine'
import { getIcon } from '../data/characterIcons'

interface ChatWindowProps {
  character: Character
  user: CurrentUser | null
  onBack: () => void
}

export default function ChatWindow({ character, user, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const Icon = getIcon(character.slug)

  useEffect(() => {
    initConversation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.id, user?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function initConversation() {
    setLoading(true)
    try {
      let existing: any[] = []
      if (user) {
        existing = await db.select(
          'conversations',
          `?character_id=eq.${character.id}&user_id=eq.${user.id}&order=created_at.desc&limit=1`
        )
      } else {
        const guestId = getGuestId()
        existing = await db.select(
          'conversations',
          `?character_id=eq.${character.id}&guest_id=eq.${guestId}&order=created_at.desc&limit=1`
        )
      }

      let convId: number
      if (existing.length > 0) {
        convId = existing[0].id
        const msgs = await db.select('messages', `?conversation_id=eq.${convId}&order=created_at.asc`)
        setMessages(msgs)
      } else {
        const payload: any = { character_id: character.id }
        if (user) {
          payload.user_id = user.id
        } else {
          payload.guest_id = getGuestId()
        }
        const [created] = await db.insert('conversations', payload)
        convId = created.id
        const greeting = getGreeting(character.slug, character.name)
        const [greetMsg] = await db.insert('messages', {
          conversation_id: convId,
          role: 'assistant',
          content: greeting,
        })
        setMessages([greetMsg])
      }
      setConversationId(convId)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || !conversationId || typing) return
    setInput('')

    const [userMsg] = await db.insert('messages', {
      conversation_id: conversationId,
      role: 'user',
      content: text,
    })
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)

    const delay = 700 + Math.random() * 900
    setTimeout(async () => {
      const responseText = generateResponse(character.slug, text)
      const [aiMsg] = await db.insert('messages', {
        conversation_id: conversationId,
        role: 'assistant',
        content: responseText,
      })
      setMessages((prev) => [...prev, aiMsg])
      setTyping(false)
    }, delay)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div
        className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-white/10"
        style={{ background: `linear-gradient(90deg, ${character.color_from}22, ${character.color_to}11)` }}
      >
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
          style={{ background: `linear-gradient(135deg, ${character.color_from}, ${character.color_to})` }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-white leading-tight">{character.name}</h2>
          <p className="text-xs text-purple-200/60">{character.title} · {character.era}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full text-purple-200/50 text-sm">
            Sohbet yükleniyor...
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                {m.role === 'assistant' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs mr-2 shrink-0 mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${character.color_from}, ${character.color_to})` }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white rounded-br-sm'
                      : 'bg-white/5 border border-white/10 text-purple-50 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ml-2 shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4 text-purple-200" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-fade-in-up">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs mr-2 shrink-0"
                  style={{ background: `linear-gradient(135deg, ${character.color_from}, ${character.color_to})` }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-typingDot" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-typingDot" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-typingDot" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSend} className="px-4 sm:px-6 py-4 border-t border-white/10 flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`${character.name}'a bir şey sor...`}
          disabled={loading}
          className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/30 disabled:opacity-50 hover:scale-105 transition-transform shrink-0"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  )
}
