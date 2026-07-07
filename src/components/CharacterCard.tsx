import { Character } from '../types'

interface CharacterCardProps {
  character: Character
  onClick: () => void
  index: number
}

export default function CharacterCard({ character, onClick, index }: CharacterCardProps) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative text-left rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-sm overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-2xl animate-fade-in-up opacity-0"
    >
      <div
        className="absolute -right-8 -top-8 w-28 h-28 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: `linear-gradient(135deg, ${character.color_from}, ${character.color_to})` }}
      />
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg text-2xl font-bold text-white relative z-10"
        style={{ background: `linear-gradient(135deg, ${character.color_from}, ${character.color_to})` }}
      >
        {character.name.charAt(0)}
      </div>
      <h3 className="text-lg font-bold text-white relative z-10">{character.name}</h3>
      <p className="text-sm font-medium relative z-10" style={{ color: character.color_from }}>
        {character.title}
      </p>
      <p className="text-xs text-purple-200/60 mt-1 relative z-10">{character.era}</p>
      <p className="text-sm text-purple-100/70 mt-3 leading-relaxed relative z-10">{character.description}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 relative z-10">
        <span>Sohbete Başla</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </button>
  )
}
