'use client'

import { useCart } from '@/context/cart-context'

export interface AddToCardButtonProps {
  productId: number
}

export function AddToCardButton({ productId }: AddToCardButtonProps) {
  const { addToCard } = useCart()

  function handleAddToCard() {
    addToCard(productId)
  }

  return (
    <button
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      type="button"
      onClick={handleAddToCard}
    >
      Adicionar ao carrinho
    </button>
  )
}
