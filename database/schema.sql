-- Tarihi kişilikler
CREATE TABLE IF NOT EXISTS characters (
  id bigint generated always as identity primary key,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  era text NOT NULL,
  description text NOT NULL,
  color_from text NOT NULL,
  color_to text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Kullanıcılar (isteğe bağlı üyelik)
CREATE TABLE IF NOT EXISTS users (
  id bigint generated always as identity primary key,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Sohbetler (üye ya da misafir)
CREATE TABLE IF NOT EXISTS conversations (
  id bigint generated always as identity primary key,
  character_id bigint NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  user_id bigint REFERENCES users(id) ON DELETE CASCADE,
  guest_id text,
  created_at timestamptz DEFAULT now()
);

-- Mesajlar
CREATE TABLE IF NOT EXISTS messages (
  id bigint generated always as identity primary key,
  conversation_id bigint NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversations_character ON conversations(character_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);

-- Karakterleri tohumla
INSERT INTO characters (slug, name, title, era, description, color_from, color_to) VALUES
('einstein', 'Albert Einstein', 'Teorik Fizikçi', '1879 - 1955', 'Görelilik teorisini geliştiren, evrenin sırlarına meraklı dahi fizikçi.', '#6366f1', '#a855f7'),
('nietzsche', 'Friedrich Nietzsche', 'Filozof', '1844 - 1900', 'Geleneksel değerleri sorgulayan, üstinsan kavramını ortaya atan isyankâr filozof.', '#ef4444', '#f97316'),
('sokrates', 'Sokrates', 'Filozof', 'MÖ 470 - 399', 'Soru sorarak öğreten, hiçbir şey bilmediğini bilen bilgelik ustası.', '#0ea5e9', '#22d3ee'),
('kleopatra', 'Kleopatra', 'Mısır Kraliçesi', 'MÖ 69 - 30', 'Zekası ve karizmasıyla tarihe damga vuran son Firavun.', '#eab308', '#f59e0b'),
('davinci', 'Leonardo da Vinci', 'Ressam ve Mucit', '1452 - 1519', 'Sanat ile bilimi birleştiren Rönesans döneminin en parlak zihni.', '#10b981', '#059669'),
('curie', 'Marie Curie', 'Bilim İnsanı', '1867 - 1934', 'Radyoaktivite alanında öncü çalışmalar yapan iki kez Nobel ödüllü bilim kadını.', '#ec4899', '#db2777'),
('konfucyus', 'Konfüçyüs', 'Filozof', 'MÖ 551 - 479', 'Ahlak, erdem ve aile değerlerini öğreten Çinli bilge.', '#f43f5e', '#be123c'),
('napolyon', 'Napolyon Bonapart', 'İmparator ve General', '1769 - 1821', 'Avrupa''yı fetheden stratejist ve Fransa İmparatoru.', '#78716c', '#44403c')
ON CONFLICT (slug) DO NOTHING;
