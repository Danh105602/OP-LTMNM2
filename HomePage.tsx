// client/src/pages/HomePage.tsx
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom"; 
import { useRef } from "react"; // <-- THÊM DÒNG NÀY
import Autoplay from "embla-carousel-autoplay"; // <-- THÊM DÒNG NÀY

// --- Định nghĩa Types và API (Giữ nguyên) ---
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
const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data;
};
const fetchHotProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("http://localhost:5000/api/products/hot");
  return data;
};

// --- Dữ liệu Banner (Lấy từ ảnh mẫu) ---
const mockHeroBanners = [
  { id: 1, title: "Stellar Blade", imageUrl: "https://cdn.wccftech.com/wp-content/uploads/2024/11/WCCFstellarblade4-HD-scaled.jpg" },
  { id: 2, title: "God of War", imageUrl: "https://images.wallpapersden.com/image/download/atreus-kratos-god-of-war-2018_a2ZrZm2UmZqaraWkpJRmbmdlrWZlbWU.jpg" },
  { id: 3, title: "Monster Hunter Wilds", imageUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202409/1002/db76ab694be57a4440a7a783bc8ac9a1eb169ad0188abf5a.jpg" }
];
const mockSideBanners = [
  { id: 1, title: "God of War", imageUrl: "https://images.wallpapersden.com/image/download/kratos-colorful-head-hd-god-of-war_bmdrZWmUmZqaraWkpJRnbmZnrWZraGc.jpg" },
  { id: 2, title: "Monster Hunter Wilds", imageUrl: "https://gamingbolt.com/wp-content/uploads/2024/09/Monster-Hunter-Wilds.jpg" }
];

// --- Dữ liệu Dịch vụ (Giữ nguyên) ---
const mockServices = [
  { id: 1, title: "GAME PASS", imageUrl: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/05/xbox-game-pass-buyer-review.jpg" },
  { id: 2, title: "NETFLIX", imageUrl: "https://about.netflix.com/images/meta/netflix-symbol-black.png" },
  { id: 3, title: "OFFICE & WINDOWS", imageUrl: "https://cdn.redmondpie.com/wp-content/uploads/2020/01/windows-10-ms-office-1200px.jpg" },
];
const saleCard = {
  id: 0,
  title: "", 
  imageUrl: "https://www.labelsetc.com/wp-content/uploads/2019/06/1121-2.jpg"
};


export default function HomePage() {
  
  // Khởi tạo plugin Autoplay
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  
  // Dùng 2 useQuery
  const { data: allProducts, isLoading: isLoadingAll, error: errorAll } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });
  const { data: hotProducts, isLoading: isLoadingHot, error: errorHot } = useQuery({
    queryKey: ["hotProducts"],
    queryFn: fetchHotProducts,
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* --- PHẦN MỚI: HERO BANNER --- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cột trái: Carousel Lớn (Tự động trượt) */}
        <div className="lg:col-span-2">
          <Carousel
            plugins={[plugin.current]}
            className="w-full rounded-lg overflow-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {mockHeroBanners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <a href="#">
                    <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover aspect-[16/9]" />
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Nút click (mũi tên) */}
            <CarouselPrevious className="left-4 bg-slate-700/50 hover:bg-slate-700 border-none text-white" />
            <CarouselNext className="right-4 bg-slate-700/50 hover:bg-slate-700 border-none text-white" />
          </Carousel>
        </div>

        {/* Cột phải: 2 Banner Nhỏ */}
        <div className="lg:col-span-1 space-y-6">
          {mockSideBanners.map((banner) => (
            <a href="#" key={banner.id} className="block rounded-lg overflow-hidden group">
              <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105" />
            </a>
          ))}
        </div>
      </section>
      
      {/* --- Phần GAME & DỊCH VỤ (Giữ nguyên) --- */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase">
          GAME & DỊCH VỤ
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-4">
            <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
              <ServiceCard key={saleCard.id} title={saleCard.title} imageUrl={saleCard.imageUrl} />
            </CarouselItem>
            {mockServices.map((service) => (
              <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <ServiceCard title={service.title} imageUrl={service.imageUrl} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex bg-slate-700 hover:bg-slate-600 text-white" /> 
          <CarouselNext className="hidden sm:flex bg-slate-700 hover:bg-slate-600 text-white" />
        </Carousel>
      </section>

      {/* --- Phần SẢN PHẨM MỚI RA MẮT (Giữ nguyên) --- */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-white mb-6 uppercase">
          SẢN PHẨM MỚI RA MẮT
        </h2>
        {isLoadingAll && <p className="text-gray-300">Đang tải sản phẩm...</p>}
        {errorAll && <p className="text-red-400">Lỗi khi tải sản phẩm</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {allProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* --- PHẦN GAME HOT (Giữ nguyên) --- */}
      <section className="bg-slate-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white uppercase">
            GAME HOT STEAM
          </h2>
          <Link to="/category/game-steam" className="text-green-400 hover:text-green-300">
            Xem tất cả
          </Link>
        </div>
        {isLoadingHot && <p className="text-gray-300">Đang tải sản phẩm...</p>}
        {errorHot && <p className="text-red-400">Lỗi khi tải sản phẩm</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
          {hotProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}