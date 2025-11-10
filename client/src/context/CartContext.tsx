// client/src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa Product
type Product = {
  id: string;
  name: string;
  imageUrl: string;
  oldPrice: string;
  newPrice: string;
};

// Định nghĩa Item trong giỏ hàng
type CartItem = Product & {
  quantity: number;
};

// Định nghĩa Context Type
type CartContextType = {
  cartItems: CartItem[];
  // THAY ĐỔI 1: Thêm 'quantity' vào hàm addToCart
  addToCart: (product: Product, quantity: number) => void; 
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  cartTotal: number; 
  totalItems: number; 
};

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom Hook (useCart)
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // THAY ĐỔI 2: Cập nhật logic của addToCart
  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Nếu đã có, cộng thêm số lượng
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Nếu chưa có, thêm mới với số lượng
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  // Tăng số lượng (chỉ tăng 1)
  const increaseQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng (chỉ giảm 1)
  const decreaseQuantity = (productId: string) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0) // Lọc bỏ nếu số lượng = 0
    );
  };

  // Xóa khỏi giỏ
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Tính tổng tiền
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.newPrice) * item.quantity;
  }, 0);

  // Tính tổng số lượng
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};