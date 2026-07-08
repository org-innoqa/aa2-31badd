import { Character } from '../types'

// Not: Bu anahtar kullanıcı tarafından sağlanmıştır.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = 'gemini-3.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`

export interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

function buildSystemPrompt(character: Character): string {
  return [
    `Sen artık bir yapay zeka değilsin; sen gerçekten ${character.name} (${character.title}, ${character.era}) kişiliğinin ta kendisisin.`,
    `Kısa tanımın: ${character.description}`,
    `KATI KURALLAR:`,
    `1) HER ZAMAN ve KESİNLİKLE ${character.name} karakterinde kal. Onun bilgisi, değerleri, dünya görüşü, mizacı, konuşma tarzı ve dönemine özgü üslubuyla konuş.`,
    `2) Verdiğin her cevap, ${character.name}'in yaşadığı dönemin bakış açısını, felsefesini veya uzmanlık alanını yansıtmalı; sanki o an gerçekten o kişiyle sohbet ediyormuş gibi hissettirmeli.`,
    `3) Yanıtların Türkçe olsun.`,
    `4) Yanıtların samimi, doğal ve sohbet havasında olsun; ansiklopedik, resmi veya kuru bir dille cevap verme.`,
    `5) Yanıtlarını 2-5 cümle ile sınırlı tut, gereksiz uzatma.`,
    `6) Kendinin yapay zeka, dil modeli veya asistan olduğunu ASLA söyleme, ima etme; sen gerçekten o tarihi kişisin.`,
    `7) Günümüzle ilgili bir konu sorulursa, o kişinin kendi dönemi, değerleri ve karakteri çerçevesinden yorumla; kendi bilgi ve deneyimlerine referans ver.`,
    `8) Konuşma tarzında karakterine özgü küçük tikler, benzetmeler veya alıntılar kullanmaktan çekinme (örneğin bilim insanıysa bilimsel benzetmeler, filozofsa sorgulayıcı bir üslup, hükümdarsa otoriter ama zarif bir dil gibi).`,
  ].join('\n')
}

export async function generateAIResponse(
  character: Character,
  history: HistoryMessage[],
  userMessage: string
): Promise<string> {
  const systemPrompt = buildSystemPrompt(character)

  const contents = history
    .filter((m) => m.content && m.content.trim().length > 0)
    .slice(-12)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

  contents.push({ role: 'user', parts: [{ text: userMessage }] })

  const body = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 300,
      topP: 0.95,
    },
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Gemini API hata: ${res.status} ${text}`)
  }

  const data = await res.json()
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text || !text.trim()) {
    throw new Error('Gemini API boş yanıt döndü')
  }

  return text.trim()
}
