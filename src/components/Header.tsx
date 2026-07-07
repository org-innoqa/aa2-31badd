import { Clock3, LogOut, User as UserIcon, Sparkles } from 'lucide-react'
import { CurrentUser } from '../types'

interface HeaderProps {
  user: CurrentUser | null
  onHome: () => void
  onOpenAuth: (mode: 'login' | 'register') => void
  onLogout: () => void
}

export default function Header({ user, onHome, onOpenAuth, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#150c2e]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 transition-transform">
            <Clock3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-400">
            Zaman Ötesi Sohbet
          </span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse hidden sm:block" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm text-purple-100 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <UserIcon className="w-4 h-4 text-fuchsia-300" />
                <span>{user.username}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-xs text-purple-200/70">Misafir olarak geziniyorsun</span>
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-purple-100 transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="text-sm px-3 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:opacity-90 text-white font-medium shadow-md shadow-fuchsia-500/20 transition-opacity"
              >
                Üye Ol
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
