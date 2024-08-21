import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import WidgetManager from './WidgetManager';

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWidgetManager, setShowWidgetManager] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm)
    ),
  }));

  return (
    <div className="container mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Widgets"
          className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleSearch}
          value={searchTerm}
        />
        <button
          onClick={() => setShowWidgetManager(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
        >
          Manage Widgets
        </button>
      </div>

      {filteredCategories.map((category) => (
        <Category key={category.id} category={category} />
      ))}

      {showWidgetManager && (
        <WidgetManager onClose={() => setShowWidgetManager(false)} />
      )}
    </div>
  );
};

export default Dashboard;
