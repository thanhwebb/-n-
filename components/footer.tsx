import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const services = [
    "Làm tin quảng cáo",
    "Chạy quảng cáo",
    "Tạo tin TikTok",
    "Tư vấn & chiến lược",
    "Tổ chức sự kiện",
    "Thiết kế sáng tạo",
  ]

  const quickLinks = ["Về chúng tôi", "Dịch vụ", "Portfolio", "Blog", "Liên hệ", "Tuyển dụng"]

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold">GoWithMedia</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Đối tác tin cậy trong hành trình phát triển thương hiệu của bạn. Chúng tôi mang đến giải pháp truyền
                thông toàn diện và hiệu quả.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Dịch vụ</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Liên kết</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Nhận tin tức</h3>
              <p className="text-muted-foreground text-sm">
                Đăng ký để nhận những thông tin mới nhất về marketing và xu hướng truyền thông.
              </p>
              <div className="space-y-3">
                <Input placeholder="Nhập email của bạn" />
                <Button className="w-full bg-primary hover:bg-primary/90">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="py-6 border-t">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Hotline</div>
                <div className="text-primary text-sm">+84 362 885 180</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Email</div>
                <div className="text-primary text-sm">hello@gowithmedia.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium text-sm">Địa chỉ</div>
                <div className="text-primary text-sm">280 Nguyễn Hữu Thọ, Hải Châu, TP.Đà Nẵng</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">© 2025 GoWithMedia. Tất cả quyền được bảo lưu.</div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
