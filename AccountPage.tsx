// client/src/pages/AccountPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore"; 
import { useState } from "react";

// --- Định nghĩa Schema (Luật) ---
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AccountPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore(); 
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // --- Form Đăng nhập ---
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // --- Form Đăng ký ---
  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: registerErrors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // --- Xử lý Đăng nhập ---
  const onSubmitLogin = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/login", data);
      const { user, token } = response.data;
      login(user, token);
      navigate("/"); // Chuyển về trang chủ
    } catch (error: any) {
      setLoginError(error.response?.data?.message || "Email hoặc mật khẩu không đúng");
    }
  };

  // --- Xử lý Đăng ký (ĐÃ NÂNG CẤP) ---
  const onSubmitRegister = async (data: RegisterFormData) => {
    setRegisterError(null);
    try {
      // 1. Gọi API Backend
      const response = await axios.post("http://localhost:5000/api/register", {
        email: data.email,
        password: data.password,
      });

      // 2. TỰ ĐỘNG ĐĂNG NHẬP (Lấy user và token từ response)
      const { user, token } = response.data;
      login(user, token);

      // 3. Chuyển về trang chủ
      navigate("/");

    } catch (error: any) {
      setRegisterError(error.response?.data?.message || "Email này đã được sử dụng");
    }
  };

  // --- Giao diện (JSX) ---
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Cột 1: ĐĂNG NHẬP */}
        <div className="bg-slate-800 rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-6">Đăng nhập</h2>
          <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-6">
            <div>
              <Label htmlFor="login-email">Tên tài khoản hoặc địa chỉ email *</Label>
              <Input
                id="login-email"
                {...registerLogin("email")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
              {loginErrors.email && <p className="text-red-400 text-sm mt-1">{loginErrors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="login-password">Mật khẩu *</Label>
              <Input
                id="login-password"
                type="password"
                {...registerLogin("password")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
              {loginErrors.password && <p className="text-red-400 text-sm mt-1">{loginErrors.password.message}</p>}
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" className="border-gray-400" />
                <Label htmlFor="remember-me" className="text-gray-400">Ghi nhớ mật khẩu</Label>
              </div>
              <a href="#" className="text-sm text-green-400 hover:text-green-300">Quên mật khẩu?</a>
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
              Đăng nhập
            </Button>
          </form>
        </div>

        {/* Cột 2: ĐĂNG KÝ */}
        <div className="bg-slate-800 rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-6">Đăng ký</h2>
          <form onSubmit={handleSubmitRegister(onSubmitRegister)} className="space-y-6">
            <div>
              <Label htmlFor="register-email">Địa chỉ email *</Label>
              <Input
                id="register-email"
                type="email"
                {...registerRegister("email")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
              {registerErrors.email && <p className="text-red-400 text-sm mt-1">{registerErrors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="register-password">Mật khẩu * (Ít nhất 6 ký tự)</Label>
              <Input
                id="register-password"
                type="password"
                {...registerRegister("password")}
                className="bg-slate-700 border-slate-600 text-white mt-2"
              />
              {registerErrors.password && <p className="text-red-400 text-sm mt-1">{registerErrors.password.message}</p>}
            </div>
            {registerError && <p className="text-red-400 text-sm">{registerError}</p>}
            <p className="text-sm text-gray-400">
              Thông tin cá nhân của bạn sẽ được sử dụng để hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này.
            </p>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6">
              Đăng ký
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}