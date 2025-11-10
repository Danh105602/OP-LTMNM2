// client/src/components/ProductCard.tsx
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext"; 
import { Link } from "react-router-dom"; 

// ... (Type Product, formatCurrency giữ nguyên) ...
type Product = {
  id: string;
  name: string;
  imageUrl: string;
  oldPrice: string;
  newPrice: string;
  category: {
    name: string;
  };
};
type ProductCardProps = {
  product: Product; 
};
const formatCurrency = (amount: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, 
  }).format(parseFloat(amount));
};

export default function ProductCard({ product }: ProductCardProps) {
  
  const { addToCart } = useCart(); 
  const { id, imageUrl, name, category, oldPrice, newPrice } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    addToCart(product, 1); 
    alert(`Đã thêm ${name} vào giỏ!`);
  };

  return (
    // THIẾT KẾ LẠI (DARK MODE)
    <Link 
      to={`/product/${id}`} 
      className="bg-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col group text-white transition-shadow hover:shadow-xl"
    >
      {/* Ảnh */}
      <div className="overflow-hidden">
        <img
          src={imageUrl} 
          alt={name} 
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Nội dung */}
      <div className="p-3 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-gray-400 uppercase mb-1">
          {category.name} 
        </span>
        <h3 className="text-base font-semibold text-white line-clamp-2 h-12">
          {name} 
        </h3>
        
        {/* Giá (Không có nút tròn, chỉ có giá) */}
        <div className="mt-2 flex-grow flex items-end justify-between">
          <span className="block text-lg font-bold text-green-400">
            {formatCurrency(newPrice)} 
          </span>
        </div>
      </div>

      {/* Nút giỏ hàng (VIỀN XANH - Nằm ngoài Link) */}
      <div className="p-3 pt-0">
        <Button
          variant="outline"
          className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Thêm vào giỏ
        </Button>
      </div>
    </Link>
  );
}