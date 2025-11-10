// client/src/pages/CartPage.tsx
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom"; 

// Hàm định dạng tiền tệ
const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
};

export default function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();

  // Giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn</h1>
        <p className="text-gray-400 mb-8">Giỏ hàng của bạn đang trống.</p>
        <Button asChild className="bg-green-500 hover:bg-green-600">
          <Link to="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    );
  }

  // Giỏ hàng có sản phẩm (GIAO DIỆN DARK MODE)
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cột trái: Danh sách sản phẩm (Nền slate-800) */}
        <div className="lg:col-span-2 bg-slate-800 rounded-lg shadow-sm p-6">
          <ul className="divide-y divide-slate-700"> {/* Dùng divider màu tối */}
            {cartItems.map(item => (
              <li key={item.id} className="flex flex-col sm:flex-row py-6">
                <img src={item.imageUrl} alt={item.name} className="w-full sm:w-32 h-32 object-cover rounded-md" />
                <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-lg font-bold text-green-400 mt-2">{formatCurrency(item.newPrice)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {/* Nút tăng giảm số lượng */}
                    <div className="flex items-center border border-slate-600 rounded-md">
                      <Button variant="ghost" size="icon" onClick={() => decreaseQuantity(item.id)} className="text-white hover:bg-slate-700">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => increaseQuantity(item.id)} className="text-white hover:bg-slate-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Nút xóa sản phẩm */}
                    <Button variant="ghost" className="text-gray-400 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng (Nền slate-800) */}
        <div className="lg:col-span-1 bg-slate-800 rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-gray-300 mb-2">
            <span>Tạm tính:</span>
            <span>{formatCurrency(cartTotal.toString())}</span>
          </div>
          <div className="flex justify-between text-gray-300 mb-4">
            <span>Giảm giá:</span>
            <span>0đ</span>
          </div>
          <hr className="my-4 border-slate-700" /> {/* Dùng divider màu tối */}
          <div className="flex justify-between text-2xl font-bold my-4">
            <span>Tổng cộng:</span>
            <span className="text-green-400">{formatCurrency(cartTotal.toString())}</span>
          </div>
          
          <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
            <Link to="/checkout">
              Tiến hành Thanh toán
            </Link>
          </Button>

        </div>
      </div>
    </div>
  );
}