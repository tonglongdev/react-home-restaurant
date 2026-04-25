import type { Food } from '../types/index';
import { motion, AnimatePresence } from 'framer-motion';

interface FoodCardProps {
  food: Food;
  isExpanded: boolean;
  onHover: (id: string | null) => void;
}

export const FoodCard = ({ food, isExpanded, onHover }: FoodCardProps) => {
  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(food.id)}
      onMouseLeave={() => onHover(null)}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-2xl cursor-pointer border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={food.imageUrl}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-orange-600 uppercase">
          {food.category.name}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
          <span className="text-lg font-bold text-orange-600">
            ${food.price.toFixed(2)}
          </span>
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            initial={{ height: "3rem" }}
            animate={{ height: isExpanded ? "auto" : "3rem" }}
            className="overflow-hidden"
          >
            <p className={`text-gray-600 text-sm ${isExpanded ? "" : "line-clamp-2"}`}>
              {food.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
