import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFoundSegment() {
  return (
    <div className="py-22.5 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">404 – Страница не найдена</h1>
      <p className="text-lg text-gray-500 mb-6">
        Такой страницы у нас нет. Зато есть много других полезных!
      </p>
      <Button asChild>
        <Link href="/" prefetch>
          На главную
        </Link>
      </Button>
    </div>
  )
}
