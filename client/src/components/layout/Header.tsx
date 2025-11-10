import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // ĐẢM BẢO CÓ IMPORT NÀY

export default function Header() {
  return (
    <header className="bg-[#1e2a3b] text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://th.bing.com/th/id/OIP.kEodWMWysh4-FWTYlT_jGgHaHa?w=174&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
            alt="Tedi Shop"
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold">TediShop</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Nhập nội dung tìm kiếm..."
              className="bg-[#2a3a50] border-0 placeholder:text-gray-400 pl-10 h-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* ĐỔI LINK TỪ /login SANG /account */}
          <Link to="/account">
            <Button className="bg-blue-600 hover:bg-blue-700 space-x-2">
              <User className="h-5 w-5" />
              <span>Đăng nhập</span>
            </Button>
          </Link>
          
          <Button variant="ghost" className="hover:bg-[#2a3a50] space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Giỏ hàng</span>
          </Button>
        </div>

      </div>
    </header>
  );
}