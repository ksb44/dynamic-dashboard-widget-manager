import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 'category-1',
      name: 'Category 1',
      widgets: [
        { id: 'widget-1', name: 'Widget 1', text: 'This is widget 1.', isVisible: true },
        { id: 'widget-2', name: 'Widget 2', text: 'This is widget 2.', isVisible: true },
      ],
    },
    {
      id: 'category-2',
      name: 'Category 2',
      widgets: [
        { id: 'widget-3', name: 'Widget 3', text: 'This is widget 3.', isVisible: true },
        { id: 'widget-4', name: 'Widget 4', text: 'This is widget 4.', isVisible: true },
      ],
    },
  ],
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter((widget) => widget.id !== widgetId);
      }
    },
    toggleWidgetInCategory: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      const widget = category.widgets.find((widget) => widget.id === widgetId);
      if (widget) {
        widget.isVisible = !widget.isVisible;
      }
    },
    applyWidgetChanges: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addWidget,removeWidget, toggleWidgetInCategory, applyWidgetChanges } = widgetsSlice.actions;
export default widgetsSlice.reducer;
