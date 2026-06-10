import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/create" className="hover:text-primary">Custom Prints</Link></li>
              <li><Link to="/bulk" className="hover:text-primary">Bulk Orders</Link></li>
              <li><Link to="/artists" className="hover:text-primary">For Artists</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop Art</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/category/stickers" className="hover:text-primary">Stickers</Link></li>
              <li><Link to="/category/art-prints" className="hover:text-primary">Art Prints</Link></li>
              <li><Link to="/category/posters" className="hover:text-primary">Posters</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/help" className="hover:text-primary">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-primary">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Print & Post</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium custom printing for photographers, artists, and creators. 
              Upload your own images and we'll turn them into professional reality.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe to get special offers and first look at new art.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Print & Post. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
