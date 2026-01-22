import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { FeaturedCollection } from './components/sections/FeaturedCollection';
import { PromoBanner } from './components/sections/PromoBanner';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CartDrawer } from './components/cart/CartDrawer';
import Checkout from './components/views/Checkout';
import PaymentCompletion from './components/views/PaymentCompletion';
import Login from './components/views/Login';
import Signup from './components/views/Signup';

function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCollection />
      <PromoBanner />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-completion" element={<PaymentCompletion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
            <CartDrawer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}