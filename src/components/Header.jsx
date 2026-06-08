import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight text-primary">Print & Post</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/category/stickers" className="transition-colors hover:text-primary">Stickers</Link>
            <Link to="/category/art-prints" className="transition-colors hover:text-primary">Art Prints</Link>
            <Link to="/category/posters" className="transition-colors hover:text-primary">Posters</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-9 w-64 rounded-md border border-input bg-background px-9 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button className="p-2 hover:bg-accent rounded-full md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/account" className="p-2 hover:bg-accent rounded-full">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative p-2 hover:bg-accent rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
