// client/src/pages/CategoryPage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

// ... (type Product, fetchProductsByCategory giữ nguyên) ...
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
const fetchProductsByCategory = async (slug: string): Promise<Product[]> => {
  const { data } = await axios.get(`http://localhost:5000/api/products/category/${slug}`);
  return data;
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", slug], 
    queryFn: () => fetchProductsByCategory(slug!),
    enabled: !!slug, 
  });

  // Giao diện DARK MODE
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Đổi nền sang DARK MODE (slate-800) */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-white mb-6 capitalize">
          {slug?.replace(/-/g, " ") || "Danh mục"}
        </h2>
        
        {isLoading && <p className="text-gray-300">Đang tải sản phẩm...</p>}
        {error && <p className="text-red-400">Lỗi khi tải sản phẩm: {error.message}</p>}

        {!isLoading && products?.length === 0 && (
          <p className="text-gray-300">Không tìm thấy sản phẩm nào trong danh mục này.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}