import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWidgetInCategory, applyWidgetChanges } from '../features/widgetsSlice';

const WidgetManager = ({ onClose }) => {
  const categories = useSelector((state) => state.widgets.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '');
  const [widgetState, setWidgetState] = useState(categories);

  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleToggle = (categoryId, widgetId) => {
    setWidgetState((prevState) => {
      return prevState.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.map((widget) =>
              widget.id === widgetId
                ? { ...widget, isVisible: !widget.isVisible }
                : widget
            ),
          };
        }
        return category;
      });
    });
  };

  const handleConfirm = () => {
    dispatch(applyWidgetChanges(widgetState));
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg p-6 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Manage Widgets</h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition"
        >
          &times;
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-lg shadow-md transition ${
              selectedCategoryId === category.id
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        {widgetState
          .find((category) => category.id === selectedCategoryId)
          ?.widgets.map((widget) => (
            <label key={widget.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={widget.isVisible}
                onChange={() => handleToggle(selectedCategoryId, widget.id)}
                className="mr-2"
              />
              <span className="text-gray-700">{widget.name}</span>
            </label>
          ))}
      </div>

      <div className=" flex justify-end space-x-4 mt-[80%]">
        <button
          onClick={handleConfirm}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WidgetManager;
