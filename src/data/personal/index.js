import { categories as saglik } from './saglik'
import { categories as kisiselGelisim } from './kisisel-gelisim'
import { categories as iliskiler } from './iliskiler'
import { categories as toplum } from './toplum'
import { categories as money } from './money'
import { categories as trivia } from './trivia'
import { categories as quotes } from './quotes'

export const title = 'Personal'

export const tabs = {
  saglik: { label: 'Sağlık', emoji: '🩺', categories: saglik },
  'kisisel-gelisim': { label: 'Kişisel Gelişim', emoji: '🌱', categories: kisiselGelisim },
  iliskiler: { label: 'Kadınlar', emoji: '💕', categories: iliskiler },
  toplum: { label: 'Toplum & Dünya', emoji: '🌍', categories: toplum },
  money: { label: 'Life', emoji: '💰', categories: money },
  trivia: { label: 'Trivia', emoji: '🧠', categories: trivia },
  quotes: { label: 'Quotes', emoji: '💬', categories: quotes },
}
