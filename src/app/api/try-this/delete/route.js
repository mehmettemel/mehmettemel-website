import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'try-this.json')

/**
 * POST /api/try-this/delete
 * Removes one item (by id) from try-this.json.
 * Dev-only: the filesystem is read-only on Vercel, so this is disabled in prod.
 * Body: { id: string }
 */
export async function POST(request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Silme yalnızca lokal geliştirmede kullanılabilir' },
      { status: 403 },
    )
  }

  const sessionCookie = (await cookies()).get('session')
  if (!sessionCookie || !(await verifyToken(sessionCookie.value))) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'id gerekli' }, { status: 400 })
    }

    const data = JSON.parse(await readFile(DATA_PATH, 'utf8'))
    const before = data.items.length
    data.items = data.items.filter((it) => it.id !== id)

    if (data.items.length === before) {
      return NextResponse.json({ error: 'Kayıt bulunamadı' }, { status: 404 })
    }

    await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8')
    revalidatePath('/listeler/daily-routines')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Try-this delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Silme başarısız' },
      { status: 500 },
    )
  }
}
