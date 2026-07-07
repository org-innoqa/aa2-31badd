import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { loginUser, registerUser } from '../lib/auth'
import { CurrentUser } from '../types'

interface AuthModalProps {
  mode: 'login' | 'register'
  onModeChange: (mode: 'login' | 'register') => void
  onClose: () => void
  onSuccess: (user: CurrentUser) => void
}

export default function AuthModal({ mode, onModeChange, onClose, onSuccess }: AuthModalProps) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      let user: CurrentUser
      if (mode === 'register') {
        user = await registerUser(username, email, password)
      } else {
        user = await loginUser(email, password)
      }
      onSuccess(user)
    } catch (err: any) {
      setError(err.message || 'Bir şeyler ters gitti, tekrar dener misin?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-[#1b1033] border border-white/10 p-6 sm:p-8 shadow-2xl animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-200/60 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400 mb-1">
          {mode === 'login' ? 'Tekrar Hoş Geldin' : 'Aramıza Katıl'}
        </h2>
        <p className="text-sm text-purple-200/60 mb-6">
          {mode === 'login'
            ? 'Sohbet geçmişine erişmek için giriş yap.'
            : 'Üye olmak zorunlu değil ama sohbetlerini saklamak için harika bir seçenek!'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-medium text-purple-200/70">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                placeholder="örn. zamangezgini"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-purple-200/70">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              placeholder="sen@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-purple-200/70">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              placeholder="En az 4 karakter"
            />
          </div>

          {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:opacity-90 text-white font-semibold py-2.5 transition-opacity disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'login' ? 'Giriş Yap' : 'Üye Ol'}
          </button>
        </form>

        <p className="text-sm text-purple-200/60 mt-5 text-center">
          {mode === 'login' ? (
            <>
              Hesabın yok mu?{' '}
              <button onClick={() => onModeChange('register')} className="text-fuchsia-400 font-semibold hover:underline">
                Üye ol
              </button>
            </>
          ) : (
            <>
              Zaten üye misin?{' '}
              <button onClick={() => onModeChange('login')} className="text-fuchsia-400 font-semibold hover:underline">
                Giriş yap
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
