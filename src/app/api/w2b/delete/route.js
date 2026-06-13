import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'w2b.json')

/**
 * POST /api/w2b/delete
 * Removes one item (by category + product) from w2b.json.
 * Dev-only: the filesystem is read-only on Vercel, so this is disabled in prod.
 * Body: { category: string, product: string }
 */
export async function POST(request) {
  // Sadece lokal geliştirmede çalışır
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Silme yalnızca lokal geliştirmede kullanılabilir' },
      { status: 403 },
    )
  }

  // Auth
  const sessionCookie = (await cookies()).get('session')
  if (!sessionCookie || !(await verifyToken(sessionCookie.value))) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  try {
    const { category, product } = await request.json()
    if (!category || !product) {
      return NextResponse.json(
        { error: 'category ve product gerekli' },
        { status: 400 },
      )
    }

    const data = JSON.parse(await readFile(DATA_PATH, 'utf8'))
    let removed = false

    for (const cat of data.categories) {
      if (cat.label !== category) continue
      const before = cat.items.length
      cat.items = cat.items.filter((it) => it.product !== product)
      if (cat.items.length < before) removed = true
    }

    if (!removed) {
      return NextResponse.json({ error: 'Kayıt bulunamadı' }, { status: 404 })
    }

    await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8')
    revalidatePath('/listeler/w2b')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('W2B delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Silme başarısız' },
      { status: 500 },
    )
  }
}
