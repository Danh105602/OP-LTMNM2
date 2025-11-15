// client/src/components/layout/Navbar.tsx
import { 
  Search, 
  ShoppingBag, 
  Store, 
  Flame, 
  Gamepad2, 
  User, 
  Ticket, 
  Clapperboard 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { useAuthStore } from "@/store/authStore"; 

type NavbarProps = {
  totalCartItems: number; 
};

export default function Navbar({ totalCartItems }: NavbarProps) {
  
  const { isLoggedIn, user, logout } = useAuthStore();

  return (
    // ĐỔI LẠI SANG DARK MODE (slate-900)
    <header className="bg-slate-900 text-gray-300 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        
        <Link to="/" className="flex items-center space-x-2 text-green-400">
          <Store className="h-8 w-8" /> 
          <span className="text-2xl font-bold text-white">TEDI SHOP</span>
        </Link>

        <div className="flex-grow mx-8 max-w-xl relative">
          <input
            type="text"
            placeholder="Nhập nội dung tìm kiếm..."
            className="w-full py-2 pl-4 pr-10 rounded-full bg-slate-800 text-white placeholder-gray-400 focus:outline-none border border-slate-700 focus:border-green-500"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center space-x-4">
          
          {isLoggedIn ? (
            <>
              <span className="text-gray-300 text-sm hidden md:block">
                Xin chào, {user?.name || user?.email}
              </span>
              <Button
                variant="outline"
                onClick={logout} 
                className="text-gray-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white"
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <Link to="/account">
              <Button variant="outline" className="text-gray-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white">
                <User className="mr-2 h-4 w-4" />
                Đăng nhập
              </Button>
            </Link>
          )}
          
          <Link to="/cart" className="relative p-2 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700">
            <ShoppingBag className="h-6 w-6 text-green-400" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
            <span className="sr-only">Giỏ hàng</span>
          </Link>
        </div>
      </div>
      
      {/* ĐỔI LẠI SANG DARK MODE (slate-800) */}
      <nav className="bg-slate-800 py-2 mt-4">
        <div className="container mx-auto flex items-center justify-between px-4 text-sm">
          <div className="flex items-center space-x-2">
            <Button className="flex items-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white">
              <span className="mr-2">☰</span> Danh mục
            </Button>
            <Link to="/category/game-steam" className="px-3 py-2 hover:bg-slate-700 rounded-md flex items-center space-x-1">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Game Steam</span>
            </Link>
            <Link to="/category/game-online" className="px-3 py-2 hover:bg-slate-700 rounded-md flex items-center space-x-1">
              <Gamepad2 className="h-4 w-4 text-blue-400" />
              <span>Game Online</span>
            </Link>
            <a href="#" className="px-3 py-2 hover:bg-slate-700 rounded-md flex items-center space-x-1">
              <Ticket className="h-4 w-4 text-green-400" />
              <span>Xbox Game Pass</span>
            </a>
            <a href="#" className="px-3 py-2 hover:bg-slate-700 rounded-md flex items-center space-x-1">
              <Clapperboard className="h-4 w-4 text-red-500" />
              <span>Netflix</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}