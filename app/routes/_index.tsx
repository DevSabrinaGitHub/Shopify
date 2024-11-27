import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import {ProductCard} from '~/components/ProductForm';

export async function loader(args: LoaderFunctionArgs) {
  const data = await args.context.storefront.query(`#graphql
    query GetProducts {
      products(first: 6) {
        nodes {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            nodes {
              url
              altText
            }
          }
        }
      }
    }
  `);

  return defer({products: data.products.nodes});
}

export default function Index() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Trending Supplements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<p>Loading products...</p>}>
            <Await resolve={products}>
              {(productList) =>
                productList.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="flex items-center justify-center bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url('/path-to-your-image.jpg')`, // Replace with actual image path
      }}
    >
      <div className="text-center bg-black bg-opacity-50 p-8 rounded">
        <h1 className="text-5xl font-bold text-white mb-4">
          Great things never came from comfort zones.
        </h1>
        <button className="px-6 py-3 bg-white text-black text-lg rounded shadow">
          Shop Now
        </button>
      </div>
    </section>
  );
}
