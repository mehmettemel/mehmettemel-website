import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Telegram Komutları | Admin',
  description: 'Telegram bot komutları',
}

const commands = [
  // Keşifler
  { cmd: '>ki', desc: 'Kitap notları', ex: '>ki İki düşünce sistemi var...' },
  { cmd: '>vi', desc: 'Video notları', ex: '>vi Huberman sabah rutini...' },
  { cmd: '>al', desc: 'Alıntılar', ex: '>al Sauna %40 mortality...' },
  { cmd: '>li', desc: 'Link', ex: '>li https://example.com' },

  // Listeler
  { cmd: '/k', desc: 'Kitap ekle', ex: '/k Thinking Fast and Slow' },
  { cmd: '/f', desc: 'Film/Dizi ekle', ex: '/f Breaking Bad' },
  { cmd: '/u', desc: 'Ürün ekle', ex: '/u iPhone 15 Pro' },

  // Tarif
  { cmd: '/tarif', desc: 'Tarif ekle', ex: '/tarif Pancake: 2 yumurta...' },

  // Sistem
  { cmd: '/help', desc: 'Yardım', ex: '/help' },
  { cmd: '/stats', desc: 'İstatistikler', ex: '/stats' },
]

export default function TelegramPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Geri
      </Link>

      <h1 className="mb-6 text-2xl font-bold">Telegram Komutları</h1>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-sm font-semibold">Komut</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Açıklama</th>
              <th className="hidden px-4 py-2 text-left text-sm font-semibold sm:table-cell">Örnek</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {commands.map((c, i) => (
              <tr key={i} className="hover:bg-muted/30">
                <td className="px-4 py-3">
                  <code className="rounded border border-primary/20 bg-primary/10 px-2 py-1 text-sm font-mono font-semibold text-primary">
                    {c.cmd}
                  </code>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{c.desc}</td>
                <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">
                  <code className="text-xs">{c.ex}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-lg bg-muted/30 p-4 text-sm">
        <p className="mb-2 font-semibold">💡 İpuçları:</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>• AI otomatik kategori belirler (Gıda/Sağlık/Kişisel/Genel)</li>
          <li>• Direkt URL gönderin, otomatik link olarak kaydedilir</li>
          <li>• AI yazar/yönetmen/marka otomatik bulur</li>
        </ul>
      </div>
    </div>
  )
}
