import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchFoods } from '../api/foodApi';
import { FoodCard } from './FoodCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: foodsData, isLoading, isError, error } = useQuery({
    queryKey: ['foods', selectedCategory, page],
    queryFn: () => fetchFoods(selectedCategory || undefined, page),
  });

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-600 mb-4">Error loading menu: {(error as Error).message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-orange-600 text-white px-6 py-2 rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto" id="menu">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Delicious Menu</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === ''
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Items
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodsData?.foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                isExpanded={expandedId === food.id}
                onHover={setExpandedId}
              />
            ))}
          </div>

          {foodsData && foodsData.pagination.pages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-gray-600 font-medium">
                Page {page} of {foodsData.pagination.pages}
              </span>
              <button
                disabled={page === foodsData.pagination.pages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
