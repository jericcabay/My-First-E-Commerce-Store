import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryItems({ category, imageUrls = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [imageUrls]);

  const currentImage = imageUrls[currentIndex] || 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className='relative overflow-hidden h-96 w-full rounded-lg group'>
      <Link to={`/category/${category}`}>
        <div className='w-full h-full cursor-pointer'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900 opacity-50 z-10' />
          <img
            className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
            src={currentImage}
            alt={category}
            loading='lazy'
          />
          <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
            <h3 className='text-white text-2xl font-bold mb-2'>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <p className='text-gray-200 text-sm'>
              {imageUrls.length} product{imageUrls.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItems;
