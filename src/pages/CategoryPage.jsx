import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { ChevronRight } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams();
  
  const category = categories.find(c => c.slug === id);
  const filteredProducts = products.filter(p => p.category === id);

  if (!category) {
    return (
      <div className="container px-4 py-24 text-center mx-auto">
        <h1 className="text-4xl font-bold mb-4">Category not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Breadcrumbs */}
      <div className="bg-light/50 border-b">
        <div className="container px-4 py-4 mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-dark">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">{category.name}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover our curated collection of high-quality {category.name.toLowerCase()} for your space.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Filters Placeholder */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(c => (
                    <li key={c.id}>
                      <Link 
                        to={`/category/${c.slug}`}
                        className={`text-sm hover:text-primary transition-colors ${c.slug === id ? 'font-bold text-primary' : ''}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border bg-light/30 p-6">
                <h3 className="text-sm font-bold mb-2">Free Shipping</h3>
                <p className="text-xs text-muted-foreground">On all orders over $30. Shop more, save more!</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8 flex items-center justify-between border-b pb-4">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-dark">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <select className="bg-transparent text-sm font-medium focus:outline-none">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
