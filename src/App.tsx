import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import { BrandpayCheckoutPage } from "./pages/brandpay/BrandpayCheckout";
import { BrandpaySuccessPage } from "./pages/brandpay/BrandpaySuccess";
import { FailPage } from "./pages/Fail";
import { PaymentBillingPage } from "./pages/payment/PaymentBilling";
import { PaymentCheckoutPage } from "./pages/payment/PaymentCheckout";
import { PaymentSuccessPage } from "./pages/payment/PaymentSuccess";
import { WidgetCheckoutPage } from "./pages/widget/WidgetCheckout";
import { WidgetSuccessPage } from "./pages/widget/WidgetSuccess";

function App() {
  return (
    <Provider>
      <AuthProvider>
        <BrowserRouter basename="/cash2025">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element= {<Navigate to="/payment/checkout" replace />}/>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<Checkout />} />
              
              {/* Widget 라우트 */}
              <Route path="widget/checkout" element={<WidgetCheckoutPage />} />
              <Route path="widget/success" element={<WidgetSuccessPage />} />
              
              {/* Brandpay 라우트 */}
              <Route path="brandpay/checkout" element={<BrandpayCheckoutPage />} />
              <Route path="brandpay/success" element={<BrandpaySuccessPage />} />
              
              {/* Payment 라우트 */}
              {/* /cash2025/payment/checkout */}
              <Route path="payment/checkout" element={<PaymentCheckoutPage />} />
              <Route path="payment/billing" element={<PaymentBillingPage />} />
              <Route path="payment/success" element={<PaymentSuccessPage />} />
              
              {/* Fail 페이지 */}
              <Route path="fail" element={<FailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;