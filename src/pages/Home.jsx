import { ArrowRight, Upload, Settings, PackageCheck, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-20 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-dark py-24 text-white min-h-[600px] flex items-center">
        <div className="container relative z-10 px-4 mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <span className="mb-4 inline-block rounded-full bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              Premium Custom Printing
            </span>
            <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl leading-[1.1]">
              Upload your photos. <br />
              <span className="text-primary text-glow">We'll print them.</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg text-gray-300 md:text-xl leading-relaxed">
              Turn your digital art and photos into professional-grade stickers, 
              fine art prints, and wall posters. Simple, fast, and high quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/create" className="rounded-md bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 transition hover:opacity-90 active:scale-95 flex items-center gap-2">
                Start Creating <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative z-10 overflow-hidden rounded-3xl border-8 border-white/10 shadow-2xl">
              <img 
                src="/images/marketing/upload_to_print_hero.png" 
                alt="Custom Printing Preview" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Glow effects */}
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-primary/20 blur-[80px]"></div>
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-secondary-blue/20 blur-[80px]"></div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('/images/marketing/upload_to_print_hero.png')] bg-cover bg-center grayscale brightness-50"></div>
      </section>

      {/* How It Works */}
      <section className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three simple steps to professional custom prints.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Upload className="h-10 w-10 text-primary" />,
              title: "1. Upload Your Image",
              desc: "Upload any high-res JPG, PNG, or WEBP. We support files up to 10MB."
            },
            {
              icon: <Settings className="h-10 w-10 text-secondary-blue" />,
              title: "2. Choose Specs",
              desc: "Select your product type (Sticker, Print, or Poster), size, and finish."
            },
            {
              icon: <PackageCheck className="h-10 w-10 text-accent" />,
              title: "3. We Print & Ship",
              desc: "Our pro team reviews your file, prints it perfectly, and ships it to your door."
            }
          ].map((step, idx) => (
            <div key={idx} className="relative p-10 rounded-3xl border bg-white shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
              <div className="mb-6 rounded-2xl bg-light p-5 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-dark">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Types */}
      <section className="bg-light/30 py-24 border-y">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">Print Options</h2>
              <p className="text-muted-foreground">Whatever you're creating, we have the perfect format.</p>
            </div>
            <Link to="/create" className="text-primary font-bold hover:underline mb-2">View all pricing →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Stickers",
                desc: "Durable, weatherproof vinyl. Perfect for laptops, gear, and branding.",
                price: "Starts at $3.00",
                image: "/images/products/sticker_stay_creative.png",
                color: "bg-accent/10"
              },
              {
                title: "Art Prints",
                desc: "Giclée quality on archival paper. Gallery-ready results for your art.",
                price: "Starts at $15.00",
                image: "/images/products/print_landscape.png",
                color: "bg-primary/10"
              },
              {
                title: "Wall Posters",
                desc: "Large scale printing on high-impact paper. Make a bold statement.",
                price: "Starts at $20.00",
                image: "/images/products/poster_ink_island.png",
                color: "bg-secondary-blue/10"
              }
            ].map((type, idx) => (
              <div key={idx} className="bg-white rounded-3xl border overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all group">
                <div className={`aspect-[4/3] overflow-hidden ${type.color} flex items-center justify-center p-12`}>
                  <img src={type.image} alt={type.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{type.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t">
                    <span className="font-bold text-dark">{type.price}</span>
                    <Link to="/create" className="bg-dark text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary transition-colors">Create</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Quality */}
      <section className="container px-4 mx-auto">
        <div className="bg-dark rounded-[40px] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Professional quality, <br />every single time.</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Archival Grade Materials</h4>
                    <p className="text-gray-400 text-sm">We use pigment-based inks and premium papers that last for generations without fading.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Fast Pro Turnaround</h4>
                    <p className="text-gray-400 text-sm">Most custom orders are printed and shipped within 2-4 business days.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-secondary-blue" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h4>
                    <p className="text-gray-400 text-sm">If you're not 100% happy with your print, we'll re-print it or refund you, no questions asked.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/marketing/trust_badges_set.png" 
                alt="Quality Showcase" 
                className="rounded-2xl shadow-2xl relative z-10 bg-white p-8"
              />
              <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10"></div>
            </div>
          </div>
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-primary/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="container px-4 mx-auto">
        <div className="mb-12 flex flex-col md:flex-row items-baseline justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-2">Inspiration Gallery</h2>
            <p className="text-muted-foreground">See what's possible with Print & Post.</p>
          </div>
          <Link to="/category/art-prints" className="group flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            Browse examples <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
