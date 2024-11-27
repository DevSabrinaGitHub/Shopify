import {Suspense} from 'react';
import {Await, Link, NavLink} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: any;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({
  header,
  cart,
  isLoggedIn,
  publicStoreDomain,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-black">
        UNCMFRT.COM
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6">
        <NavLink to="/shop" className="hover:underline text-gray-800">
          Shop
        </NavLink>
        <NavLink to="/science" className="hover:underline text-gray-800">
          Science
        </NavLink>
        <NavLink to="/podcasts" className="hover:underline text-gray-800">
          Podcasts
        </NavLink>
        <NavLink to="/trainers" className="hover:underline text-gray-800">
          Trainers
        </NavLink>
        <NavLink to="/blog" className="hover:underline text-gray-800">
          Blog
        </NavLink>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/quiz"
          className="hidden md:block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Take The Quiz
        </Link>

        <button
          className="relative"
          onClick={() => console.log('Cart clicked')}
        >
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            <Suspense fallback="0">
              <Await resolve={cart}>
                {(cartData) => cartData?.totalQuantity ?? 0}
              </Await>
            </Suspense>
          </span>
          🛒
        </button>

        {/* Mobile Menu Toggle */}
        <HeaderMenuMobileToggle />
      </div>
    </header>
  );
}

/* Componentes Auxiliares */

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="block md:hidden"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function CartBadge({ count }: { count: number | null }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}
