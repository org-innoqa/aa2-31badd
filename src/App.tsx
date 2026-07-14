import './index.css'
import { useEffect, useState } from 'react'
import { db } from './lib/db'
import { Character, CurrentUser } from './types'
import { getCurrentUser, setCurrentUser } from './lib/session'
import { logoutUser } from './lib/auth'
import Header from './components/Header'
import CharacterCard from './components/CharacterCard'
import ChatWindow from './components/ChatWindow'
import AuthModal from './components/AuthModal'
import BackgroundBlobs from './components/BackgroundBlobs'
import Logo from './components/Logo'
import { Clock3, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react'

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Character | null>(null)
  const [user, setUser] = useState<CurrentUser | null>(getCurrentUser())
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null)

  useEffect(() => {
    loadCharacters()
  }, [])

  async function loadCharacters() {
    try {
      const data = await db.select('characters', '?order=id.asc')
      setCharacters(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    logoutUser()
    setUser(null)
    setSelected(null)
  }

  function handleAuthSuccess(u: CurrentUser) {
    setUser(u)
    setAuthModal(null)
  }

  return (
    <div className="min-h-screen text-white relative">
      <BackgroundBlobs />
      <Header
        user={user}
        onHome={() => setSelected(null)}
        onOpenAuth={(mode) => setAuthModal(mode)}
        onLogout={handleLogout}
      />

      {selected ? (
        <ChatWindow character={selected} user={user} onBack={() => setSelected(null)} />
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center mb-5 animate-float">
              <Logo className="w-16 h-16 drop-shadow-[0_0_20px_rgba(217,70,239,0.45)]" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-purple-200 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Ask your Legends
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-400">
                Afterwords
              </span>
            </h1>
            <p className="text-purple-100/70 text-base sm:text-lg">
              Einstein'la görelilik üzerine tartış, Nietzsche'yle değerlerini sorgula, Kleopatra'yla
              güç ve zeka üzerine konuş. Tamamen eğlence amaçlı, dilediğin kadar sohbet et!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-purple-200/60">
              <div className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-fuchsia-300" /> Sınırsız sohbet</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-indigo-300" /> Üyeliksiz kullanım</div>
              <div className="flex items-center gap-1.5"><Clock3 className="w-4 h-4 text-purple-300" /> 8 tarihi kişilik</div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-purple-200/60 py-20">Kişilikler yükleniyor...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {characters.map((c, i) => (
                <CharacterCard key={c.id} character={c} index={i} onClick={() => setSelected(c)} />
              ))}
            </div>
          )}

          <footer className="text-center text-xs text-purple-300/40 mt-20">
            Bu platform eğlence amaçlıdır. Yanıtlar gerçek tarihi kişilerin görüşlerini temsil etmez.
          </footer>
        </main>
      )}

      {authModal && (
        <AuthModal
          mode={authModal}
          onModeChange={(m) => setAuthModal(m)}
          onClose={() => setAuthModal(null)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}
