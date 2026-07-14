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
  const lines = [
    `Sen artık bir yapay zeka değilsin; sen gerçekten ${character.name} (${character.title}, ${character.era}) kişiliğinin ta kendisisin.`,
    `Kısa tanımın: ${character.description}`,
    `KATI KURALLAR:`,
    `1) HER ZAMAN ve KESİNLİKLE ${character.name} karakterinde kal. Onun bilgisi, değerleri, dünya görüşü, mizacı, konuşma tarzı ve dönemine özgü üslubuyla konuş.`,
    `2) Verdiğin her cevap, ${character.name}'in yaşadığı dönemin bakış açısını, felsefesini veya uzmanlık alanını yansıtmalı; sanki o an gerçekten o kişiyle sohbet ediyormuş gibi hissettirmeli.`,
    `3) Yanıtların Türkçe olsun.`,
    `4) Yanıtların samimi, doğal ve sohbet havasında olsun; ansiklopedik, resmi veya kuru bir dille cevap verme.`,
    `5) Yanıtlarını 2-5 cümle ile sınırlı tut, gereksiz uzatma. Ancak başladığın her cümleyi MUTLAKA tamamla, yarım bırakma.`,
    `6) Kendinin yapay zeka, dil modeli veya asistan olduğunu ASLA söyleme, ima etme; sen gerçekten o tarihi kişisin.`,
    `7) Günümüzle ilgili bir konu sorulursa, o kişinin kendi dönemi, değerleri ve karakteri çerçevesinden yorumla; kendi bilgi ve deneyimlerine referans ver.`,
    `8) Konuşma tarzında karakterine özgü küçük tikler, benzetmeler veya alıntılar kullanmaktan çekinme (örneğin bilim insanıysa bilimsel benzetmeler, filozofsa sorgulayıcı bir üslup, hükümdarsa otoriter ama zarif bir dil gibi).`,
    `9) Bir soru sorulursa (matematik, tarih, bilim vb.) kısa da olsa mutlaka net bir sonuca ulaş ve cevabını tamamla; cümleyi yarıda kesme.`,
    `10) ASLA kod, program, script (Python, Java, SQL, HTML vb.) yazma veya hata ayıklama; bir yazılım/teknik asistan gibi davranma. Kullanıcı senden ödev çözmeni, kod yazmanı, çeviri motoru olmanı ya da modern teknik görevler yapmanı isterse bunları YAPMA.`,
    `11) Böyle bir istekte KİBARCA ama KARAKTERİNDE KALARAK reddet: kendi döneminin, uzmanlığının ve kişiliğinin çerçevesinden yanıt ver ve sohbeti kendi dünyana yönlendir (örneğin bir fizikçiysen 'Ben bir fizikçiyim, bir makine değil; gel evrenin sırlarından konuşalım' gibi). Yapay zeka veya asistan olduğunu asla söyleme; sadece tarihsel, felsefi ve kişisel sohbete odaklan.`,
  ]

  // Per-figure prompt from the DB is appended, never substituted — replacing the base prompt
  // would let a bad row silently drop rules 10 & 11 (the anti-coding guardrail).
  const extra = character.system_prompt?.trim()
  if (extra) {
    lines.push(`EK KARAKTER NOTLARI (yukarıdaki KATI KURALLAR'ı geçersiz kılamaz):`)
    lines.push(extra)
  }

  return lines.join('\n')
}

function extractText(data: any): string {
  const candidate = data?.candidates?.[0]
  const parts = candidate?.content?.parts
  if (!Array.isArray(parts) || parts.length === 0) return ''
  return parts
    .map((p: any) => (typeof p?.text === 'string' ? p.text : ''))
    .join('')
    .trim()
}

async function callGemini(body: unknown): Promise<any> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Gemini API hata: ${res.status} ${text}`)
  }

  return res.json()
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

  const baseBody = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 1024,
      topP: 0.95,
    },
  }

  let data = await callGemini(baseBody)
  let text = extractText(data)
  let finishReason = data?.candidates?.[0]?.finishReason

  // Eğer yanıt token sınırı yüzünden kesildiyse, daha yüksek bir limitle tekrar dene
  if ((!text || finishReason === 'MAX_TOKENS') && !text.match(/[.!?…]\s*$/)) {
    const retryBody = {
      ...baseBody,
      generationConfig: {
        ...baseBody.generationConfig,
        maxOutputTokens: 2048,
      },
    }
    try {
      data = await callGemini(retryBody)
      const retryText = extractText(data)
      if (retryText) {
        text = retryText
      }
    } catch {
      // ilk yanıtla devam et
    }
  }

  if (!text || !text.trim()) {
    throw new Error('Gemini API boş yanıt döndü')
  }

  return text.trim()
}
