
import {useState} from 'react';
import {Await} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Money} from '@shopify/hydrogen';

interface CartMainProps {
  cart: CartApiQueryFragment | null;
  layout: 'aside' | 'page';
}

export function CartMain({cart, layout}: CartMainProps) {
  const [cartItems, setCartItems] = useState(cart?.lines.nodes || []);

  const handleQuantityChange = (lineId: string, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === lineId ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (lineId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== lineId);
    setCartItems(updatedItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.merchandise.price.amount);
    }, 0);
  };

  return (
    <div className={`cart-drawer ${layout === 'aside' ? 'w-96' : 'w-full'} fixed right-0 top-0 bg-white shadow-lg h-full z-50`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold">Your Bag</h2>
        <button onClick={() => console.log('Close Drawer')} className="text-gray-500 hover:text-black">✕</button>
      </div>
      <div className="p-4 overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img src={item.merchandise.image.url} alt={item.merchandise.image.altText} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="text-sm font-bold">{item.merchandise.title}</h3>
                  <p className="text-xs text-gray-500">
                    <Money data={item.merchandise.price} />
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="w-12 border rounded text-center"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
      <div className="p-4 border-t">
        <p className="text-sm flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold">
            <Money data={{amount: calculateSubtotal(), currencyCode: 'USD'}} />
          </span>
        </p>
        <button className="w-full bg-black text-white py-2 mt-4 rounded">Checkout</button>
      </div>
    </div>
  );
}
