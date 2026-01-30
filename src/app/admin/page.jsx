import { AdminTabs } from '@/components/admin/AdminTabs'
import Link from 'next/link'
import { Bot, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your content',
}

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your notes, lists, and recipes
        </p>
      </div>

      {/* Quick Links */}
      <div className="mb-6">
        <Link href="/admin/telegram">
          <Card className="group cursor-pointer border-primary/20 bg-primary/5 p-4 transition-all hover:border-primary/40 hover:bg-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Telegram Bot Dokümantasyonu</h3>
                  <p className="text-sm text-muted-foreground">
                    Tüm komutlar, kullanım örnekleri ve teknik bilgiler
                  </p>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </Card>
        </Link>
      </div>

      <AdminTabs />
    </div>
  )
}
