import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function StorageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600] grid-rows-app gap-5 p-8">
      <Header />
      {children}
    </div>
  )
}
