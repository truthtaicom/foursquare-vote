import React from 'react';
import { Home } from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './App.store';
import { GlobalStyle } from './shared/components/GlobalStyle';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <div>
          <Route path="/" exact component={Home} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
