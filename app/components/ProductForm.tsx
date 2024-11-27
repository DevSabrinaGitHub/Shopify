
import {useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {Product} from 'storefrontapi.generated';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({product}: ProductCardProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="product-card border p-4 rounded shadow hover:shadow-lg transition">
      <div className="product-image">
        <Image data={product.images.nodes[0]} sizes="(min-width: 45em) 20vw, 50vw" />
      </div>
      <div className="product-details mt-2">
        <h3 className="font-bold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
      </div>
      <button
        className="mt-4 w-full bg-black text-white py-2 rounded"
        onClick={openDrawer}
      >
        Add to Cart
      </button>

      {isDrawerOpen && <ProductDrawer product={product} closeDrawer={closeDrawer} />}
    </div>
  );
}

interface ProductDrawerProps {
  product: Product;
  closeDrawer: () => void;
}

export function ProductDrawer({product, closeDrawer}: ProductDrawerProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="fixed top-0 right-0 w-96 bg-white shadow-lg h-full z-50">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Product Details</h2>
        <button onClick={closeDrawer} className="text-gray-500 hover:text-black">✕</button>
      </div>
      <div className="p-4">
        <Image data={product.images.nodes[0]} sizes="(min-width: 45em) 20vw, 50vw" />
        <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
        <p className="mt-2 text-sm text-gray-500">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
        <div className="mt-4">
          <label htmlFor="quantity" className="block text-sm text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="mt-1 border rounded w-full py-1 px-2"
            min="1"
          />
        </div>
        <button className="mt-4 w-full bg-black text-white py-2 rounded">
          Add {quantity} to Cart
        </button>
      </div>
    </div>
  );
}
