// client/src/pages/CheckoutPage.tsx
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Giả sử bạn đã cài: npx shadcn@latest add input
import { Label } from "@/components/ui/label"; // Giả sử bạn đã cài: npx shadcn@latest add label
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Định nghĩa Schema (luật) cho form
const checkoutSchema = z.object({
  name: z.string().min(1, "Tên là bắt buộc"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Hàm định dạng tiền tệ
const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
};

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Tạm thời, chúng ta chỉ log (in) data ra console
  const onSubmit = (data: CheckoutFormData) => {
    console.log("Thông tin đơn hàng:", data);
    console.log("Sản phẩm:", cartItems);
    console.log("Tổng tiền:", cartTotal);
    alert("Đã gửi đơn hàng (xem ở console F12)!");
    // (Bước tiếp theo sẽ là gửi data này về backend)
  };

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold mb-8">Thông tin Thanh toán</h1>
      
      {/* Sử dụng form và handleSubmit */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cột trái: Form điền thông tin */}
        <div className="lg:col-span-2 bg-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Thông tin của bạn</h2>
          <div className="space-y-6">
            
            {/* Tên */}
            <div>
              <Label htmlFor="name" className="text-gray-300">Tên của bạn *</Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
                placeholder="Nguyễn Văn A"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Số điện thoại */}
            <div>
              <Label htmlFor="phone" className="text-gray-300">Số điện thoại *</Label>
              <Input
                id="phone"
                {...register("phone")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
                placeholder="098xxxxxxx"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300">Địa chỉ email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
          </div>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng */}
        <div className="lg:col-span-1 bg-slate-800 rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h2>
          
          {/* Danh sách sản phẩm */}
          <ul className="divide-y divide-slate-700 mb-6">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between py-3 text-sm">
                <span className="text-gray-300">{item.name} <span className="text-gray-400">× {item.quantity}</span></span>
                <span className="font-medium">{formatCurrency((parseFloat(item.newPrice) * item.quantity).toString())}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-between text-gray-300 mb-2">
            <span>Tạm tính:</span>
            <span>{formatCurrency(cartTotal.toString())}</span>
          </div>
          <hr className="my-4 border-slate-700" />
          <div className="flex justify-between text-2xl font-bold my-4">
            <span>Tổng cộng:</span>
            <span className="text-green-400">{formatCurrency(cartTotal.toString())}</span>
          </div>

          {/* Nút Đặt hàng */}
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
            Đặt hàng
          </Button>

        </div>
      </form>
    </div>
  );
}