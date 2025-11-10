// client/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css' 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage'; 
import CheckoutPage from './pages/CheckoutPage'; 

import CategoryPage from './pages/CategoryPage'; // <-- THÊM DÒNG NÀY

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} /> 
              <Route path="/cart" element={<CartPage />} /> 
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* ROUTE MỚI CHO TRANG LỌC */}
              <Route path="/category/:slug" element={<CategoryPage />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </CartProvider>
  </React.StrictMode>,
)