// client/src/components/ServiceCard.tsx
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  imageUrl: string;
  // Bỏ bgColor
};

export default function ServiceCard({ title, imageUrl }: ServiceCardProps) {
  return (
    // Sử dụng ảnh làm nền (Dark Mode)
    <a
      href="#"
      className="relative block w-full h-32 rounded-2xl overflow-hidden group shadow-lg"
    >
      {/* Ảnh nền */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Lớp phủ màu đen mờ */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* Tiêu đề (căn giữa) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
      {/* Mũi tên */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 h-8 w-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="h-5 w-5" />
      </div>
    </a>
  );
}