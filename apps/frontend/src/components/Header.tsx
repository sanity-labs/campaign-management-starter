import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-neutral-900"
        >
          <span className="relative h-16 w-16 overflow-hidden">
            <Image
              src="/images/sanity-symbol.png"
              alt="Sanity logo"
              fill
              className="object-cover object-left"
            />
          </span>
          <span>Wander</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Shop
          </Link>
        </nav>
      </div>
    </header>
  )
}
