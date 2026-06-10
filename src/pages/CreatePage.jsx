import { useState, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { pricing, getBulkDiscount } from '../data/pricing';
import { Upload, Plus, Minus, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatePage() {
  const { addToCart } = useCart();
  const [selectedType, setSelectedType] = useState('stickers');
  const [selectedSizeId, setSelectedSizeId] = useState('2x2');
  const [selectedFinishId, setSelectedFinishId] = useState('glossy');
  const [quantity, setQuantity] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const productType = pricing[selectedType];
  const selectedSize = productType.sizes.find(s => s.id === selectedSizeId) || productType.sizes[0];
  const selectedFinish = productType.finishes.find(f => f.id === selectedFinishId) || productType.finishes[0];

  const priceBreakdown = useMemo(() => {
    const basePrice = selectedSize.price;
    const finishPrice = selectedFinish.price;
    const itemPrice = basePrice + finishPrice;
    const subtotal = itemPrice * quantity;
    const discountPercent = getBulkDiscount(quantity);
    const discountAmount = subtotal * discountPercent;
    const total = subtotal - discountAmount;

    return {
      itemPrice,
      subtotal,
      discountPercent: (discountPercent * 100).toFixed(0),
      discountAmount,
      total
    };
  }, [selectedSize, selectedFinish, quantity]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedSizeId(pricing[type].sizes[0].id);
    setSelectedFinishId(pricing[type].finishes[0].id);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleAddToCart = () => {
    if (!imagePreview) {
      alert("Please upload an image first!");
      return;
    }

    const customItem = {
      id: `custom-${Date.now()}`,
      name: `${productType.name} (${selectedSize.name})`,
      price: priceBreakdown.total / quantity,
      image: imagePreview,
      category: selectedType,
      isCustom: true,
      options: {
        type: selectedType,
        size: selectedSize.name,
        finish: selectedFinish.name,
        quantity: quantity
      }
    };

    addToCart(customItem, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Preview & Upload */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Create Your Custom Print</h1>
            <p className="text-lg text-muted-foreground">Upload your artwork and choose your specifications.</p>
          </div>

          <div 
            className={`relative aspect-square max-w-2xl mx-auto rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 overflow-hidden ${
              dragActive ? 'border-primary bg-primary/5' : 'border-muted'
            } ${imagePreview ? 'border-none p-0 bg-light' : 'bg-gray-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
                <button 
                  onClick={() => {setImagePreview(null); setImageFile(null);}}
                  className="absolute top-4 right-4 bg-dark/80 text-white p-2 rounded-full hover:bg-dark transition"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <p className="text-xl font-bold mb-2">Drag & drop your image here</p>
                <p className="text-muted-foreground mb-6">PNG, JPG, or WEBP (Max 10MB)</p>
                <label className="bg-primary text-white px-8 py-3 rounded-md font-bold cursor-pointer hover:opacity-90 transition">
                  Browse Files
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFile(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>
          
          <div className="bg-light p-6 rounded-xl flex gap-4">
            <AlertCircle className="h-6 w-6 text-secondary-blue shrink-0" />
            <div>
              <p className="font-bold text-sm">Quality Assurance</p>
              <p className="text-xs text-muted-foreground mt-1">
                We review every file for resolution and color accuracy. If we spot any issues, 
                our team will contact you before printing.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Options */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Specifications</h2>
            
            {/* Product Type */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">1. Product Type</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(pricing).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`py-3 px-2 rounded-lg border text-xs font-bold transition-all ${
                      selectedType === type 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-muted hover:border-dark'
                    }`}
                  >
                    {type === 'artPrints' ? 'Art Print' : type.charAt(0).toUpperCase() + type.slice(1, -1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">2. Select Size</label>
              <div className="space-y-2">
                {productType.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-lg border transition-all ${
                      selectedSizeId === size.id 
                        ? 'border-primary ring-1 ring-primary' 
                        : 'border-muted hover:border-dark'
                    }`}
                  >
                    <span className="text-sm font-medium">{size.name}</span>
                    <span className="text-sm font-bold">${size.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">3. Choose Finish</label>
              <div className="space-y-2">
                {productType.finishes.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinishId(finish.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-lg border transition-all ${
                      selectedFinishId === finish.id 
                        ? 'border-primary ring-1 ring-primary' 
                        : 'border-muted hover:border-dark'
                    }`}
                  >
                    <span className="text-sm font-medium">{finish.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {finish.price > 0 ? `+$${finish.price.toFixed(2)}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 block">4. Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-light transition"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center font-bold text-lg border-x focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-light transition"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {priceBreakdown.discountPercent > 0 && (
                  <span className="bg-accent text-dark text-[10px] font-bold px-2 py-1 rounded">
                    {priceBreakdown.discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per unit</span>
                <span className="font-medium">${priceBreakdown.itemPrice.toFixed(2)}</span>
              </div>
              {priceBreakdown.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Bulk Discount ({priceBreakdown.discountPercent}%)</span>
                  <span>-${priceBreakdown.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-primary">${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={!imagePreview || addedToCart}
              className={`w-full mt-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                addedToCart 
                  ? 'bg-green-500 text-white' 
                  : imagePreview 
                    ? 'bg-dark text-white hover:bg-dark/90' 
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <><Check className="h-5 w-5" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="h-5 w-5" /> Add to Cart</>
              )}
            </button>
            
            {!imagePreview && (
              <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium italic">
                * Please upload an image to enable adding to cart
              </p>
            )}
          </div>
          
          <div className="text-center">
            <Link to="/category/stickers" className="text-sm font-medium text-muted-foreground hover:text-primary transition underline decoration-dotted underline-offset-4">
              Need inspiration? Browse our shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
