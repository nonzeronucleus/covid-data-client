import React from 'react';
import createStore from './redux/createStore';
import {StoreContext} from 'redux-react-hook';
import Timer from './components/Timer'

const store = createStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Timer />
    </StoreContext.Provider>
  );
}

export default App;
