// client/src/store/authStore.tsx
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 1. Định nghĩa 'User'
type User = {
  id: string;
  email: string;
  name: string | null;
};

// 2. Định nghĩa 'State' (trạng thái)
type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// 3. Tạo store (kho)
export const useAuthStore = create(
  // 4. Dùng 'persist' để lưu vào localStorage
  persist<AuthState>(
    (set) => ({
      // Dữ liệu ban đầu
      user: null,
      token: null,
      isLoggedIn: false,

      // Hành động 'login' (khi đăng nhập thành công)
      login: (user, token) => {
        set({
          user: user,
          token: token,
          isLoggedIn: true,
        });
      },

      // Hành động 'logout' (khi đăng xuất)
      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: 'auth-storage', // Tên của key trong localStorage (để "lưu lần sau")
      storage: createJSONStorage(() => localStorage), // Chỉ định dùng localStorage
    }
  )
);