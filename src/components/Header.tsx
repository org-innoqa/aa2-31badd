import { LogOut, User as UserIcon } from 'lucide-react'
import { CurrentUser } from '../types'
import Logo from './Logo'

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
          <div className="group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(217,70,239,0.35)]">
            <Logo className="w-10 h-10" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-400">
            Zaman Ötesi Sohbet
          </span>
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
