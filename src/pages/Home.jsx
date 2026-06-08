import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Stickers',
    description: 'Durable vinyl stickers for any surface.',
    image: 'https://images.unsplash.com/photo-1572375927902-1c09e2d5c94e?q=80&w=400&h=300&auto=format&fit=crop',
    href: '/category/stickers'
  },
  {
    name: 'Art Prints',
    description: 'High-quality prints of curated illustrations.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&h=300&auto=format&fit=crop',
    href: '/category/art-prints'
  },
  {
    name: 'Wall Posters',
    description: 'Large-scale posters for your space.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=400&h=300&auto=format&fit=crop',
    href: '/category/posters'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 py-24 text-white">
        <div className="container relative z-10 px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            Art for your walls, <br className="hidden md:block" /> stickers for your life.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
            Discover curated collections of stickers, art prints, and posters. 
            Transform your space with unique designs from independent artists.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/category/stickers" className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
              Shop Stickers
            </Link>
            <Link to="/category/art-prints" className="rounded-md border border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Browse Art
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop" 
            alt="Art Background" 
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="container px-4">
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

      {/* Featured Products Placeholder */}
      <section className="container px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">Our most popular designs this week.</p>
          </div>
          <Link to="/all" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative animate-pulse">
              <div className="aspect-square rounded-lg bg-gray-200"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                <div className="h-4 w-1/4 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
