import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const categories = [
  {
    name: 'Stickers',
    description: 'Durable vinyl stickers for any surface.',
    image: '/images/products/sticker_stay_creative.png',
    href: '/category/stickers'
  },
  {
    name: 'Art Prints',
    description: 'High-quality prints of curated illustrations.',
    image: '/images/products/print_landscape.png',
    href: '/category/art-prints'
  },
  {
    name: 'Wall Posters',
    description: 'Large-scale posters for your space.',
    image: '/images/products/poster_ink_island.png',
    href: '/category/posters'
  }
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark py-24 text-white">
        <div className="container relative z-10 px-4 text-center mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Art for your walls, <br className="hidden md:block" /> stickers for your life.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover curated collections of stickers, art prints, and posters. 
            Transform your space with unique designs from independent artists.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/category/stickers" className="rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Shop Stickers
            </Link>
            <Link to="/category/art-prints" className="rounded-md border border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Browse Art
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/images/products/hero_banner.png" 
            alt="Art Background" 
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="container px-4 mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground">Find the perfect format for your favorite art.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.href}
              className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary">
                  Browse <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="container px-4 mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#00A8E8]">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-12 text-white">
            <div className="flex-1 text-center md:text-left">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest">Limited Time Offer</span>
              <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">Spring Art Sale</h2>
              <p className="mb-8 text-lg text-blue-50 md:text-xl">
                Get up to <span className="font-bold text-accent">25% OFF</span> on all art prints and posters. 
                Refresh your space with fresh colors.
              </p>
              <Link to="/category/art-prints" className="rounded-md bg-white px-8 py-3 text-sm font-bold text-blue-600 shadow-lg transition hover:bg-gray-100">
                Shop the Sale
              </Link>
            </div>
            <div className="w-full md:w-1/3">
              <img 
                src="/images/marketing/banner_sale_mid.png" 
                alt="Sale Banner" 
                className="rounded-lg shadow-2xl transition duration-500 hover:scale-105"
              />
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/20 blur-3xl"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">Our most popular designs this week.</p>
          </div>
          <Link to="/category/stickers" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
