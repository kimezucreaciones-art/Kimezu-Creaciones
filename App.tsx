import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton'; 
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails'; 
import { Bundles } from './pages/Bundles';
import { Aromatherapy } from './pages/Aromatherapy';
import { CustomRequest } from './pages/CustomRequest';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { OrderFailed } from './pages/OrderFailed';
import { AdminDashboard } from './pages/AdminDashboard'; // Import Admin Page
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext'; // Import Product Context

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen font-sans bg-kimezu-bg text-kimezu-text">
            <Marquee />
            <Header />
            <CartDrawer />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/bundles" element={<Bundles />} />
                <Route path="/aromatherapy" element={<Aromatherapy />} />
                <Route path="/custom-request" element={<CustomRequest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/order-failed" element={<OrderFailed />} />
                <Route path="/product/:id" element={<ProductDetails />} /> 
                <Route path="/admin" element={<AdminDashboard />} /> {/* New Route */}
              </Routes>
            </main>
            <WhatsAppButton /> 
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;