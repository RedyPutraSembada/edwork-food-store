import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Tag from './pages/Tag';
import Category from './pages/Category';
import Product from './pages/Product';
import { Provider } from 'react-redux';
import store from './app/store';
import Cart from './pages/Cart';
import DeliveryAddress from './pages/DeliveryAddress';
import CheckAddress from './pages/CheckAddress';
import Invoice from './pages/Invoice';
import Pesanan from './pages/Pesanan';

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
          <Route path="/carts" element={<Cart />} />
          <Route path="/delivery" element={<DeliveryAddress />} />
          <Route path="/check-address" element={<CheckAddress />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/pesanan" element={<Pesanan />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
