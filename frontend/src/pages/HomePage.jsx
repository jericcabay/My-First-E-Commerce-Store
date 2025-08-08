import { useEffect, useState } from 'react';
import { useProductApi } from '../api/productApi.js';
import CategoryItems from '../components/CategoryItems.jsx';
import categories from '../tools/categories.js';

function HomePage() {
  const { GetTheProductsByCategory } = useProductApi();
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsImageByCategory = async () => {
      const map = {};

      const promises = categories.map(async (category) => {
        const products = await GetTheProductsByCategory(category.name);
        if (Array.isArray(products) && products.length > 0) {
          const images = products.map(p => p.image);
          map[category.name] = images;
        }
      });

      await Promise.all(promises);
      setCategoryMap(map);
      setLoading(false);
    };

    fetchProductsImageByCategory();
  }, []);

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <h1 className='text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-emerald-400 mb-10'>
          Explore Product Categories
        </h1>

        {loading ? (
          <p className='text-center text-xl text-gray-300'>Loading categories...</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {Object.entries(categoryMap).map(([categoryName, imageUrls]) => (
              <CategoryItems
                key={categoryName}
                category={categoryName}
                imageUrls={imageUrls}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
