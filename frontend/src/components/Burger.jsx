// Burger.js
import { Menu } from 'lucide-react'; // or any icon library you prefer

function Burger({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
    >
      <Menu size={24} />
    </button>
  );
}

export default Burger;
