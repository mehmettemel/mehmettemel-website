import logoVietnam from '@/images/flags/vietnam.svg'
import logoCambodia from '@/images/flags/cambodia.svg'
import logoThailand from '@/images/flags/thailand.svg'
import logoKazakhstan from '@/images/flags/kazakhstan.svg'

export const countries = [
  {
    slug: 'vietnam',
    name: 'Vietnam',
    image: logoVietnam,
    cities: [
      'Hanoi',
      'Ho Chi Minh City',
      'Da Nang',
      'Hue',
      'Hoi An',
      'Nha Trang',
    ],
  },
  {
    slug: 'cambodia',
    name: 'Cambodia',
    image: logoCambodia,
    cities: ['Siem Reap', 'Battambang'],
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    image: logoThailand,
    cities: ['Bangkok', 'Chiang Mai'],
  },
  {
    slug: 'kazakhstan',
    name: 'Kazakhstan',
    image: logoKazakhstan,
    cities: ['Almaty'],
  },
]
