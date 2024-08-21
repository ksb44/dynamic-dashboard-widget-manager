import React from 'react';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
    <div className="bg-gray-100 min-h-screen p-8">
      <Dashboard />
    </div>
    </Provider>
  );
};

export default App;
