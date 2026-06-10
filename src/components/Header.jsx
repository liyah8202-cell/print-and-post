import { ShoppingCart, Menu, Search, User, Truck, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <>
      <div className="bg-primary py-2 text-center text-xs font-bold text-white">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Truck className="h-3 w-3" />
          <span>FREE SHIPPING ON CUSTOM ORDERS OVER $30! — UPLOAD YOUR IMAGES TODAY</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img src="/images/branding/logo_main.png" alt="Print & Post" className="h-10 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-tight">
              <Link 
                to="/create" 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                  location.pathname === '/create' 
                    ? 'bg-primary text-white' 
                    : 'text-primary hover:bg-primary/10'
                }`}
              >
                <Plus className="h-4 w-4" />
                Create
              </Link>
              <div className="group relative py-4">
                <span className="cursor-pointer hover:text-primary transition-colors">Inspiration</span>
                <div className="absolute top-full left-0 hidden group-hover:block pt-0">
                  <div className="bg-white border rounded-lg shadow-xl p-4 min-w-[200px] flex flex-col gap-3">
                    <Link to="/category/stickers" className="text-muted-foreground hover:text-primary transition-colors font-medium">Stickers</Link>
                    <Link to="/category/art-prints" className="text-muted-foreground hover:text-primary transition-colors font-medium">Art Prints</Link>
                    <Link to="/category/posters" className="text-muted-foreground hover:text-primary transition-colors font-medium">Posters</Link>
                  </div>
                </div>
              </div>
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
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
