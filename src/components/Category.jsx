import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Widget from './Widget';
import { addWidget } from '../features/widgetsSlice';

const Category = ({ category }) => {
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false);

  const handleAddWidget = () => {
    if (widgetName && widgetText) {
      const widget = {
        id: `widget-${Date.now()}`,
        name: widgetName,
        text: widgetText,
        isVisible: true,
      };
      dispatch(addWidget({ categoryId: category.id, widget }));
      setWidgetName('');
      setWidgetText('');
      setShowAddWidgetForm(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets
          .filter((widget) => widget.isVisible)
          .map((widget) => (
            <Widget key={widget.id} categoryId={category.id} widget={widget} />
          ))}
        {showAddWidgetForm ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Widget Name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <textarea
              placeholder="Widget Text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddWidget}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddWidgetForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddWidgetForm(true)}
            className="flex items-center justify-center bg-gray-100 text-gray-500 border border-dashed border-gray-300 p-6 rounded-lg hover:bg-gray-200 transition"
          >
            + Add Widget
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;
