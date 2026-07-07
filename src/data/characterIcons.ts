import { Brain, Flame, MessageCircle, Crown, Palette, FlaskConical, BookOpen, Sword, User, LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  einstein: Brain,
  nietzsche: Flame,
  sokrates: MessageCircle,
  kleopatra: Crown,
  davinci: Palette,
  curie: FlaskConical,
  konfucyus: BookOpen,
  napolyon: Sword,
}

export function getIcon(slug: string): LucideIcon {
  return iconMap[slug] || User
}
