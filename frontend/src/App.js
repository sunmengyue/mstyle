import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import ShopAll from './pages/ShopAll';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';

const App = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <Route path="/order/:id" component={Order} />
      <Route path="/shopAll" component={ShopAll} />
      <Route path="/placeorder" component={PlaceOrder} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/payment" component={Payment} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/cart/:id?" component={Cart} />
      <Route exact path="/search/:keyword" component={ShopAll} />
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default App;
