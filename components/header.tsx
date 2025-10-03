"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CartSidebar } from "@/components/cart-sidebar"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const services = [
    { name: "Quảng cáo trực tuyến", href: "#services", category: "ads" },
    { name: "Sản xuất nội dung", href: "#services", category: "content" },
    { name: "Quản lý truyền thông", href: "#services", category: "management" },
    { name: "Thiết kế - sáng tạo", href: "#services", category: "design" },
    { name: "Tư vấn & chiến lược", href: "#services", category: "consulting" },
    { name: "SEO & Website", href: "#services", category: "seo" },
    { name: "Tổ chức sự kiện", href: "#services", category: "events" },
    { name: "Influencer/KOL Marketing", href: "#services", category: "influencer" },
    { name: "Đào tạo & workshop", href: "#services", category: "training" },
    { name: "Phân tích & báo cáo", href: "#services", category: "analytics" },
  ]

  const handleServiceClick = (category: string) => {
    console.log("[v0] Service clicked:", category)
    const servicesSection = document.getElementById("services")
    console.log("[v0] Services section found:", !!servicesSection)

    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
      console.log("[v0] Scrolling to services section")

      // Wait for scroll to complete then filter and highlight
      setTimeout(() => {
        console.log("[v0] Dispatching filterServices event with category:", category)
        window.dispatchEvent(new CustomEvent("filterServices", { detail: { category } }))

        // Highlight the selected category
        const categoryElement = document.getElementById(`category-${category}`)
        console.log("[v0] Category element found:", !!categoryElement)

        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: "smooth", block: "center" })
          categoryElement.classList.add("ring-2", "ring-primary", "ring-offset-2")
          console.log("[v0] Added highlight classes to category element")

          setTimeout(() => {
            categoryElement.classList.remove("ring-2", "ring-primary", "ring-offset-2")
            console.log("[v0] Removed highlight classes from category element")
          }, 2000)
        }
      }, 500)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">GoWithMedia</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Trang chủ
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                <span>Dịch vụ</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {services.map((service, index) => (
                  <DropdownMenuItem key={index} onClick={() => handleServiceClick(service.category)}>
                    <span className="w-full cursor-pointer">{service.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Về chúng tôi
            </a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <CartSidebar />

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground max-w-[120px] truncate">
                  Xin chào, <span className="font-medium text-foreground">{user.name}</span>
                </span>
                <Button variant="outline" size="sm" onClick={logout} className="shrink-0 bg-transparent">
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <AuthModal />
            )}

            <Button className="bg-primary hover:bg-primary/90 shrink-0">Liên hệ ngay</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary">
                Trang chủ
              </a>

              <div className="px-3 py-2">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-foreground hover:text-primary">
                    <span>Dịch vụ</span>
                    <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 ml-4 space-y-1">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleServiceClick(service.category)
                          setIsMenuOpen(false)
                        }}
                        className="block w-full text-left px-2 py-1 text-sm text-muted-foreground hover:text-primary"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </details>
              </div>

              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary">
                Về chúng tôi
              </a>
              <a href="#portfolio" className="block px-3 py-2 text-foreground hover:text-primary">
                Portfolio
              </a>
              <div className="px-3 py-2">
                <CartSidebar />
              </div>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground break-words">
                      Xin chào, <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={logout} className="w-full bg-transparent">
                      Đăng xuất
                    </Button>
                  </div>
                ) : (
                  <AuthModal />
                )}
              </div>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90">Liên hệ ngay</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
