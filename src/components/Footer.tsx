export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Quán Tình</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Serving traditional recipes with a modern twist. Visit us for an unforgettable dining experience.
        </p>
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Quán Tình. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
