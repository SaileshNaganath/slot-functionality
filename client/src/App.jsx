
import './App.css'
import { Provider } from 'react-redux';
import store from './store';

import Index from './pages/Index';

function App() {
  

  return (
    <>
    <Provider store={store}>
        
        <div className="App">
              <Index/>
        </div>
        
  </Provider>
    </>
  )
}

export default App
