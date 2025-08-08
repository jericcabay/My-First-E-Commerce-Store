import { PlusCircle, ShoppingBasket } from 'lucide-react';
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import Orders from '../components/Orders.jsx';
import ProductsList from '../components/ProductsList.jsx';
import StaffListView from './StaffListView.jsx';
import RegisterRiderForm from './RegisterRiderForm.jsx';

const tabs = [
  { id: 'orders', label: 'Consumer Orders', icon: PlusCircle },
  { id: 'form', label: 'Products Register', icon: ShoppingBasket },
  { id: 'list', label: 'Products List', icon: ShoppingBasket },
  { id: 'analytics', label: 'Analytics', icon: PlusCircle },
  { id: 'staff', label: 'Company Staff', icon: ShoppingBasket },
  { id: 'riders', label: 'Riders', icon: PlusCircle },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="min-h-screen flex bg-gray-700 text-white">
      {/* Sidebar */}
      <aside className="w-56 px-4 bg-gray-800 p-12 space-y-6 border-r border-gray-700">
        <nav className="flex flex-col space-y-4 py-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-4 rounded-md text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <tab.icon className="mr-3 w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-6">
          {tabs.find((tab) => tab.id === activeTab)?.label}
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'form' && <ProductForm />}
          {activeTab === 'list' && <ProductsList />}
          {activeTab === 'staff' && <StaffListView />}

        </div>
      </main>
    </div>
  );
};

export default AdminPage;
