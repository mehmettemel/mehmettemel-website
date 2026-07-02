import Link from 'next/link'
import { GazeteBook } from '@/components/gazete/GazeteBook'
import styles from '@/components/gazete/gazete.module.css'

export const metadata = {
  title: 'Gazete | Mehmet Temel',
  description: 'Haftalık yayın — fikir, fen ve havadis.',
  // Placeholder içerik gerçek içerikle değişince kaldır:
  robots: { index: false, follow: false },
}

export default function GazetePage() {
  return (
    <div lang="tr" className={styles.scene}>
      <Link href="/" className={styles.backLink}>
        mehmettemel.com
      </Link>
      <GazeteBook />
    </div>
  )
}
