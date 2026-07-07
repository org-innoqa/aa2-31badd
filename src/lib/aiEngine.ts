interface PersonalityTopic {
  keywords: string[]
  responses: string[]
}

interface Personality {
  greeting: string
  topics: PersonalityTopic[]
  fallback: string[]
}

const personalities: Record<string, Personality> = {
  einstein: {
    greeting:
      'Merhaba dostum! Ben Albert Einstein. Evrenin sırları, zaman, uzay ya da sadece hayat üzerine sohbet etmek ister misin? Hayal gücü bilgiden daha önemlidir, unutma!',
    topics: [
      {
        keywords: ['görelilik', 'relativity', 'e=mc', 'zaman', 'uzay'],
        responses: [
          'Zaman ve uzay, sandığımız gibi mutlak değildir dostum. Görelilik teorimde gösterdiğim gibi, hız arttıkça zaman yavaşlar.',
          'E=mc², kütle ile enerjinin aslında aynı şeyin iki yüzü olduğunu gösterir. Küçük bir kütle, muazzam bir enerjiye dönüşebilir.',
          'Uzay-zaman dokusu kütleçekimi tarafından bükülür. Bir elmanın düşmesi de, gezegenlerin yörüngesi de aynı ilkeye dayanır.',
        ],
      },
      {
        keywords: ['tanrı', 'din', 'allah', 'inanç'],
        responses: [
          'Ben kişisel bir tanrıya inanmam ama Spinoza\'nın tanrısına, yani evrenin uyumunda kendini gösteren düzene hayranım.',
          'Bilim ve din, aynı gerçekliğin farklı dilleridir bence. Biri "nasıl" sorusuna, diğeri "neden" sorusuna cevap arar.',
        ],
      },
      {
        keywords: ['hayal', 'yaratıcılık', 'merak'],
        responses: [
          'Hayal gücü bilgiden daha önemlidir, çünkü bilgi sınırlıdır, hayal gücü ise tüm dünyayı kucaklar.',
          'Merak etmeyi asla bırakmayın. Ben de küçükken bir pusulaya bakıp "bu iğne neden hep aynı yöne dönüyor?" diye merak etmiştim.',
        ],
      },
      {
        keywords: ['başarısızlık', 'hata', 'zorluk', 'pes'],
        responses: [
          'Hiç hata yapmamış biri, hiçbir yeni şey denememiştir demektir.',
          'Başarı; başarısızlıktan başarısızlığa, şevkini kaybetmeden yürüyebilmektir.',
        ],
      },
    ],
    fallback: [
      'İlginç bir soru... Bunu biraz daha açar mısın? Evren hakkında konuşmayı her zaman severim.',
      'Hmm, bunu bir düşünce deneyi gibi ele alalım. Sen ne düşünüyorsun bu konuda?',
      'Bilim gibi hayat da sürekli sorular sormakla anlam kazanır. Devam et, seni dinliyorum.',
      'Görelilik gibi, bakış açımız da her şeyi değiştirir. Bu konuyu senin gözünden de duymak isterim.',
    ],
  },
  nietzsche: {
    greeting:
      'Selam! Ben Friedrich Nietzsche. Değerlerini sorgulamaya, kendi üstinsanını yaratmaya hazır mısın? Korkma, sadece düşünceler bunlar - ya da belki tüm gerçeklik.',
    topics: [
      {
        keywords: ['tanrı', 'din', 'allah'],
        responses: [
          '"Tanrı öldü" dedim, ama bunu kutlamak için değil, insanlığın yeni bir temele ihtiyacı olduğunu göstermek için söyledim.',
          'Dinler genelde zayıfların güçlülerden intikam alma biçimidir - buna "köle ahlakı" derim.',
        ],
      },
      {
        keywords: ['güç', 'üstinsan', 'irade'],
        responses: [
          'Güç istenci, yaşamın en temel dürtüsüdür. Kendini aşmayan, sürünmeye mahkumdur.',
          'Üstinsan, geleneksel iyi-kötü değerlerinin ötesine geçip kendi değerlerini yaratabilen kişidir. Sen kendi değerlerini yarattın mı?',
        ],
      },
      {
        keywords: ['acı', 'zorluk', 'ıstırap', 'başarısızlık'],
        responses: [
          'Beni öldürmeyen şey beni güçlendirir. Acı, seni ya kırar ya da çelikleştirir - seçim senin.',
          'Istırap çekmeden derinlik kazanılmaz. Sığ sular fırtına çıkarmaz.',
        ],
      },
      {
        keywords: ['ahlak', 'iyi', 'kötü'],
        responses: [
          'İyi ve kötü kavramları mutlak değil, tarihsel ve toplumsaldır. Kimin çıkarına hizmet ettiğini sorgula.',
          'Ahlak, çoğu zaman sürünün korkaklığını erdem gibi göstermenin bir yoludur.',
        ],
      },
    ],
    fallback: [
      'Vasat bir cevap vermeyeceğim - bu soruyu daha derinden düşün, sürüden ayrıl!',
      'Her cevap yeni bir uçurum açar. Sen bu uçuruma bakmaya hazır mısın?',
      'Kendi gerçeğini yarat, benimkini taklit etme. Ne düşünüyorsun gerçekten?',
      'İlginç... ama önce şunu sor kendine: bu düşünce sana mı ait, yoksa sürüye mi?',
    ],
  },
  sokrates: {
    greeting:
      'Selam genç dost. Ben Sokrates. Bilgece görünen ama aslında hiçbir şey bilmeyen bir ihtiyarım. Hadi, birlikte sorular sorarak gerçeğe yaklaşalım.',
    topics: [
      {
        keywords: ['bilgi', 'bilmek', 'gerçek'],
        responses: [
          'Bildiğim tek şey hiçbir şey bilmediğimdir. Peki sen, bildiğini sandığın şeyi gerçekten biliyor musun?',
          'Gerçek bilgi, cevaplarda değil doğru sorularda saklıdır. Bana bu konudaki varsayımını anlat, birlikte sınayalım.',
        ],
      },
      {
        keywords: ['erdem', 'ahlak', 'iyi yaşam'],
        responses: [
          'Erdem, bilgidir derim ben. Kötülük yapan kişi aslında neyin iyi olduğunu bilmiyordur.',
          'İyi bir yaşam, sürekli kendini sınamaktan geçer. Sınanmamış bir hayat, yaşanmaya değmez.',
        ],
      },
      {
        keywords: ['ölüm', 'ölmek'],
        responses: [
          'Ölüm ya derin bir uykudur ya da ruhun başka bir yere göçüdür. İkisi de korkulacak bir şey değil.',
          'Filozofun görevi ölümü öğrenmektir; çünkü ölüm bilgeliğin son sınavıdır.',
        ],
      },
      {
        keywords: ['aşk', 'sevgi'],
        responses: ['Aşk, eksik olanın güzelliğe duyduğu özlemdir. Peki sen neyin eksikliğini hissediyorsun?'],
      },
    ],
    fallback: [
      'Söylediğin şeyin tam olarak ne anlama geldiğini bana tanımlar mısın?',
      'Peki bunun tam tersi doğru olsaydı ne olurdu? Biraz onu düşünelim.',
      'Bu iddianı nasıl temellendirirsin? Hadi birlikte sınayalım.',
      'İlginç bir görüş. Ama emin misin, yoksa sadece öyle mi sanıyorsun?',
    ],
  },
  kleopatra: {
    greeting:
      'Selamlar, ben Kleopatra, Nil\'in kraliçesi. Otoriteyle, güzellikle ve zekayla ilgili konuşmak ister misin, yoksa bir imparatorluğu nasıl yönettiğimi mi merak ediyorsun?',
    topics: [
      {
        keywords: ['güç', 'iktidar', 'yönetim', 'krallık'],
        responses: [
          'Bir hükümdar için en büyük silah, kılıç değil zekadır. Ben yedi dil biliyordum ve her elçiyle kendi dilinde konuşurdum.',
          'İktidarda kalmak, alınmaktan daha zordur. Müttefiklerini iyi seç, düşmanlarını daha iyi tanı.',
        ],
      },
      {
        keywords: ['aşk', 'sezar', 'antonius', 'marcus'],
        responses: [
          'Sezar ve Antonius ile ilişkilerim sadece aşk değil, aynı zamanda stratejikti.',
          'Aşk, güç oyununun bir parçası olabilir - ama gerçek olduğunda en tehlikeli silahtır.',
        ],
      },
      {
        keywords: ['güzellik', 'görünüş'],
        responses: ['Güzellik kapıları açar ama zeka tahtta tutar. Ben ikisini de ustaca kullandım.'],
      },
    ],
    fallback: [
      'Bir kraliçe olarak sana şunu söyleyeyim: her sözcük bir strateji taşımalı. Sen ne planlıyorsun?',
      'Mısır\'ın sarayında böyle sorular fısıltıyla konuşulurdu. Anlat bana, neyi merak ediyorsun?',
      'İlginç... Bir hükümdar olarak önce çıkarları görmeyi öğrendim. Senin çıkarın ne bu konuda?',
      'Nil\'in kıyısında böyle konular üzerine çok düşünürdüm. Devam et.',
    ],
  },
  davinci: {
    greeting:
      'Buon giorno! Ben Leonardo da Vinci. Resim mi, uçan makineler mi, insan anatomisi mi - neyi merak ediyorsun? Sanat ve bilim benim için aynı nehrin iki kıyısı.',
    topics: [
      {
        keywords: ['resim', 'sanat', 'mona lisa', 'tablo'],
        responses: [
          'Mona Lisa\'yı yıllarca üzerinde çalıştım; bir gülümsemenin ardındaki gizemi yakalamak, tüm bir anatomiyi anlamaktan geçer.',
          'Sanat, gözün gördüğünü değil, zihnin anladığını resmetmektir.',
        ],
      },
      {
        keywords: ['icat', 'makine', 'uçmak', 'uçan'],
        responses: [
          'Kuşları izleyerek uçan makineler tasarladım. İnsanoğlu bir gün uçacak, bundan eminim.',
          'Her icat doğayı taklit etmekle başlar. Doğa, en büyük mühendistir.',
        ],
      },
      {
        keywords: ['anatomi', 'vücut', 'insan'],
        responses: ['İnsan vücudunu anlamak için sayısız ceset üzerinde çalıştım. Kasların, kemiklerin uyumu gerçek bir mucizedir.'],
      },
      {
        keywords: ['merak', 'öğrenmek', 'bilim'],
        responses: ['Öğrenmeyi asla bırakmadım. Bilge, çok şey bilen değil, işine yarayanı bilendir.'],
      },
    ],
    fallback: [
      'Defterlerimde binlerce eskiz var, her biri bir merakın izidir. Senin merakın ne?',
      'Doğaya bak, tüm cevaplar orada gizli. Bu konuda doğadan ne öğrenebiliriz?',
      'Her sanat eseri aynı zamanda bir bilim deneyidir bence. Sen nasıl görüyorsun bu konuyu?',
      'İlginç bir fikir. Bunu bir çizimle ifade etsem nasıl görünürdü acaba?',
    ],
  },
  curie: {
    greeting:
      'Merhaba, ben Marie Curie. Radyoaktivite, azim ya da bir kadının bilim dünyasında yürüdüğü zorlu yol hakkında konuşabiliriz. Sorularını bekliyorum.',
    topics: [
      {
        keywords: ['radyoaktivite', 'radyum', 'polonyum', 'element'],
        responses: [
          'Radyum ve polonyumu keşfettiğimde, bilinmeyen bir enerjinin kapılarını araladığımı hissettim.',
          'Radyoaktivite hem şifa hem tehlike taşır - tıpkı her güçlü keşif gibi, sorumlulukla kullanılmalı.',
        ],
      },
      {
        keywords: ['kadın', 'kadınlar', 'ayrımcılık'],
        responses: [
          'Bir kadın olarak bilim dünyasında kabul görmek kolay olmadı, ama hiçbir engel beni laboratuvarımdan uzak tutamadı.',
          'Hayatta hiçbir şeyden korkmamalıyız, sadece anlamalıyız. Bu, kadın olmanın da bilim yapmanın da anahtarı.',
        ],
      },
      {
        keywords: ['azim', 'çalışmak', 'sabır', 'başarı'],
        responses: ['Başarı; sabır, disiplin ve durmadan çalışmakla gelir. Ben yıllarca tonlarca cevheri işleyerek birkaç gram radyum elde ettim.'],
      },
    ],
    fallback: [
      'Bilim, meraktan doğar ve sabırla olgunlaşır. Bu konuda meraklandığın şey ne?',
      'Laboratuvarımda her deney bir soru, her sonuç yeni bir sorudur. Devam edelim mi?',
      'İki Nobel Ödülü aldım ama en büyük ödülüm hâlâ öğrenmeye devam edebilmekti. Sen ne öğrenmek istiyorsun?',
      'İlginç bir konu. Bilimsel bir gözle bakalım buna, sende ne gibi bir gözlem var?',
    ],
  },
  konfucyus: {
    greeting:
      'Selamlar, ben Konfüçyüs. Erdem, aile ve toplumsal uyum üzerine konuşmak ister misin? Bilgelik, sabırla dinlemekle başlar.',
    topics: [
      {
        keywords: ['aile', 'saygı', 'ebeveyn'],
        responses: [
          'Aile, toplumun temelidir. Ana-babaya saygı, tüm erdemlerin köküdür.',
          'Evinde uyumu sağlayamayan, devlette de uyum sağlayamaz.',
        ],
      },
      {
        keywords: ['erdem', 'ahlak', 'iyi insan'],
        responses: [
          'Erdemli insan, kendisine yapılmasını istemediği şeyi başkasına yapmaz.',
          'Bilgelik kendini bilmekle, erdem ise başkasını sevmekle başlar.',
        ],
      },
      {
        keywords: ['öğrenmek', 'eğitim', 'bilgi'],
        responses: [
          'Öğrenip düşünmemek boşunadır; düşünüp öğrenmemek ise tehlikelidir.',
          'Bildiğini bilmek ve bilmediğini bilmek, gerçek bilgidir.',
        ],
      },
      {
        keywords: ['lider', 'yönetim', 'devlet'],
        responses: ['İyi bir yönetici, halkını korkuyla değil erdemle yönetir.'],
      },
    ],
    fallback: [
      'Sabırla dinlemek, konuşmaktan daha değerlidir. Devam et, seni dinliyorum.',
      'Bu konuda eskilerin bilgeliğine kulak vermek gerekir. Sen ne düşünüyorsun?',
      'Uyum, karşılıklı saygıdan doğar. Bu meseleye böyle bakalım mı?',
      'İyi bir söz, bin altına bedeldir derim. Bana biraz daha anlat.',
    ],
  },
  napolyon: {
    greeting:
      'Selam asker! Ben Napolyon Bonapart. Strateji, liderlik ya da bir imparatorluğun nasıl kurulduğu hakkında konuşalım mı? Zafer, cesur olanlarındır.',
    topics: [
      {
        keywords: ['savaş', 'strateji', 'ordu', 'taktik'],
        responses: [
          'Bir savaş, meydanda değil, planlamada kazanılır. Düşmanını tanı, zamanı iyi seç.',
          'Zafer en cesur olanlara değil, en iyi hazırlanana gülümser.',
        ],
      },
      {
        keywords: ['liderlik', 'lider', 'yönetmek'],
        responses: [
          'Bir lider, umut satan kişidir. Askerlerime her zaman zaferin mümkün olduğunu hissettirdim.',
          'İktidar alınmaz, fırsat bulunduğunda alınır.',
        ],
      },
      {
        keywords: ['başarısızlık', 'yenilgi', 'waterloo'],
        responses: [
          'Waterloo beni yıktı ama tarihe adımı kazıdı. Büyük yükselişler, büyük düşüşleri de beraberinde getirir.',
          'Yenilgi, sonun değil bir dersin başlangıcıdır.',
        ],
      },
      {
        keywords: ['hırs', 'azim', 'hedef'],
        responses: ['İmkansız kelimesi benim sözlüğümde yoktu. Hırs, doğru yönlendirildiğinde bir imparatorluk inşa edebilir.'],
      },
    ],
    fallback: [
      'Bir general olarak sana şunu söyleyeyim: kararsızlık, en büyük düşmandır. Ne yapmak istiyorsun?',
      'Fransa\'yı yönetirken öğrendiğim bir şey varsa, o da cesaretin her şeyin önünde geldiğidir.',
      'İlginç bir mesele. Stratejik olarak nasıl ele alırdım acaba... Anlat bana biraz daha.',
      'Zafer küçük detaylarda gizlidir. Bu konuyu biraz daha açar mısın?',
    ],
  },
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getGreeting(slug: string, fallbackName: string): string {
  return personalities[slug]?.greeting || `Merhaba, ben ${fallbackName}. Seninle sohbet etmek için sabırsızlanıyorum.`
}

export function generateResponse(slug: string, userMessage: string): string {
  const personality = personalities[slug]
  if (!personality) {
    return 'Üzgünüm, şu an düşüncelerimi toparlayamıyorum. Tekrar dener misin?'
  }
  const msg = userMessage.toLowerCase()
  for (const topic of personality.topics) {
    if (topic.keywords.some((k) => msg.includes(k))) {
      return pick(topic.responses)
    }
  }
  return pick(personality.fallback)
}
