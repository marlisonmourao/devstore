import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  async function searchProducts(query: string): Promise<Product[]> {
    const response = await api(`/products/search?q=${query}`, {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
    })

    const products = await response.json()

    return products
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
            >
              <Image
                src={item.image}
                className="group-hover:scale-105 transition-transform duration-500 self-center"
                width={480}
                height={480}
                quality={100}
                alt=""
              />

              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{item.title}</span>
                <span className="flex h-full items-center justify-center px-4 rounded-full bg-violet-500 font-semibold text-sm">
                  {item.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
