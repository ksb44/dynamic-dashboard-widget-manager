import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/widgetsSlice';

const Widget = ({ categoryId, widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">{widget.name}</h3>
      <p className="text-gray-600">{widget.text}</p>
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
      >
        &times;
      </button>
    </div>
  );
};

export default Widget;
