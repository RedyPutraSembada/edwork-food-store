import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Tag from './pages/Tag';
import Category from './pages/Category';
import Product from './pages/Product';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/products" element={<Product />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
