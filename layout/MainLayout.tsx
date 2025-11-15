// client/src/components/layout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
import { useCart } from "@/context/CartContext";

export default function MainLayout() {
  const { totalItems } = useCart();

  return (
    // ĐỔI TỪ f2f3f7 (xám) SANG slate-900 (xanh đậm)
    <div className="min-h-screen bg-slate-900"> 
      <Navbar totalCartItems={totalItems} /> 
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}