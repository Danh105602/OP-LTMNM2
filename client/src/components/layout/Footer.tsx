// client/src/components/layout/Footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">TEDI SHOP</h3>
          <p className="text-sm">
            Cung cấp game bản quyền và dịch vụ uy tín, giá rẻ.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-3">Sản phẩm</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-white">Game Steam</Link></li>
            <li><Link to="#" className="hover:text-white">Game Online</Link></li>
            <li><Link to="#" className="hover:text-white">Netflix</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-white">Câu hỏi thường gặp</Link></li>
            <li><Link to="#" className="hover:text-white">Chính sách bảo hành</Link></li>
            <li><Link to="#" className="hover:text-white">Liên hệ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Theo dõi</h4>
        </div>

        <div className="md:col-span-4 text-center border-t border-gray-700 pt-8 mt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} TediShop. Tất cả bản quyền được bảo lưu.</p>
        </div>

      </div>
    </footer>
  );
}