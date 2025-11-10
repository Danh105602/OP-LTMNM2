// client/src/pages/ProductDetailPage.tsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ShieldCheck, Star } from 'lucide-react';

// Định nghĩa kiểu dữ liệu Product (THÊM description)
type Product = {
  id: string;
  name: string;
  imageUrl: string;
  oldPrice: string; 
  newPrice: string;
  description: string | null; // <-- THÊM DÒNG NÀY
  category: {
    name: string;
    slug: string;
  };
};

// API (Giữ nguyên, nó sẽ tự động lấy 'description')
const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  return data;
};

// Hàm định dạng tiền tệ
const formatCurrency = (amount: string) => {
  if (!amount) return "";
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, 
  }).format(parseFloat(amount));
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Đã thêm ${quantity} ${product.name} vào giỏ!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-8 text-white">Đang tải sản phẩm...</div>;
  }
  if (error || !product) {
    return <div className="container mx-auto p-8 text-red-400">Lỗi khi tải sản phẩm.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs (giữ nguyên) */}
      <nav className="text-sm text-gray-400 mb-4">
        <Link to="/" className="hover:text-white">Trang chủ</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category.slug}`} className="hover:text-white capitalize">
          {product.category.name}
        </Link>
      </nav>

      {/* Khung chính */}
      <div className="bg-slate-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cột Trái: Ảnh */}
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover" />
          </div>

          {/* Cột Phải: Thông tin (Giữ nguyên) */}
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-400 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-1" />
                Chính sách bảo hành
              </span>
              <span className="text-yellow-400 flex items-center">
                <Star className="h-5 w-5 mr-1" />
                Rating: 5.0
              </span>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 mb-6">
              <span className="text-xl text-gray-400 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
              <span className="block text-4xl font-bold text-green-400">
                {formatCurrency(product.newPrice)}
              </span>
            </div>
            <div className="mb-6">
              <span className="block text-sm font-medium mb-2">Số lượng</span>
              <div className="flex items-center border border-slate-600 rounded-md w-fit">
                <Button variant="ghost" size="icon" onClick={handleDecrease} className="text-white hover:bg-slate-600">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 text-lg">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={handleIncrease} className="text-white hover:bg-slate-600">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} size="lg" className="bg-slate-600 hover:bg-slate-500 text-white text-lg flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button onClick={handleBuyNow} size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg flex-1">
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHẦN MÔ TẢ MỚI --- */}
      {product.description && (
        <section className="bg-slate-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Thông tin sản phẩm</h2>
          {/* Dùng 'prose' của Tailwind để tự động style HTML (h3, p, img...)
            Dùng 'dangerouslySetInnerHTML' để render HTML từ database
          */}
          <div 
            className="prose prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: product.description }} 
          />
        </section>
      )}

    </div>
  );
}