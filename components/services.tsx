"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Target,
  Video,
  Users,
  FileText,
  Palette,
  ArrowRight,
  ShoppingCart,
  Settings,
  GraduationCap,
  Star,
  Search,
  Globe,
  Calendar,
  BarChart3,
  Lightbulb,
} from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { LearnMoreModal } from "@/components/learn-more-modal"
import { useState, useEffect } from "react"

const allServices = [
  // 1. Dịch vụ quảng cáo trực tuyến
  {
    category: "ads",
    icon: Target,
    title: "Quảng cáo Facebook/Instagram Ads",
    description: "Chạy quảng cáo hiệu quả trên Facebook và Instagram với targeting chính xác.",
    features: ["Thiết lập campaign", "Targeting chi tiết", "Tối ưu ROI", "Báo cáo hàng tuần"],
    price: "Từ 5.000.000đ/tháng",
    group: "Dịch vụ quảng cáo trực tuyến",
  },
  {
    category: "ads",
    icon: Search,
    title: "Google Ads (Search, Display, YouTube)",
    description: "Quản lý chiến dịch Google Ads toàn diện trên tất cả các nền tảng.",
    features: ["Search Ads", "Display Network", "YouTube Ads", "Shopping Ads"],
    price: "Từ 6.000.000đ/tháng",
    group: "Dịch vụ quảng cáo trực tuyến",
  },
  {
    category: "ads",
    icon: Video,
    title: "TikTok Ads",
    description: "Chạy quảng cáo TikTok hiệu quả với creative viral và targeting Gen Z.",
    features: ["In-feed Ads", "Spark Ads", "Brand Takeover", "Hashtag Challenge"],
    price: "Từ 4.000.000đ/tháng",
    group: "Dịch vụ quảng cáo trực tuyến",
  },

  // 2. Dịch vụ sản xuất nội dung
  {
    category: "content",
    icon: Video,
    title: "Quay dựng video quảng cáo",
    description: "Sản xuất video quảng cáo chuyên nghiệp từ ý tưởng đến thành phẩm.",
    features: ["Script writing", "Quay phim HD", "Post-production", "Motion graphics"],
    price: "Từ 15.000.000đ/video",
    group: "Dịch vụ sản xuất nội dung",
  },
  {
    category: "content",
    icon: Palette,
    title: "Chụp ảnh sản phẩm chuyên nghiệp",
    description: "Chụp ảnh sản phẩm chất lượng cao cho e-commerce và marketing.",
    features: ["Studio setup", "Lighting chuyên nghiệp", "Retouching", "Multiple angles"],
    price: "Từ 2.000.000đ/session",
    group: "Dịch vụ sản xuất nội dung",
  },
  {
    category: "content",
    icon: FileText,
    title: "Viết bài PR/Bài SEO",
    description: "Viết content PR và SEO chất lượng cao, tối ưu cho search engine.",
    features: ["Keyword research", "SEO optimization", "Engaging content", "Press release"],
    price: "Từ 500.000đ/bài",
    group: "Dịch vụ sản xuất nội dung",
  },
  {
    category: "content",
    icon: Star,
    title: "Làm viral clip TikTok/Reels",
    description: "Tạo content viral cho TikTok và Instagram Reels với xu hướng mới nhất.",
    features: ["Trend analysis", "Creative concept", "Professional editing", "Hashtag strategy"],
    price: "Từ 1.500.000đ/clip",
    group: "Dịch vụ sản xuất nội dung",
  },

  // 3. Dịch vụ quản lý truyền thông
  {
    category: "management",
    icon: Users,
    title: "Quản lý fanpage Facebook",
    description: "Quản lý fanpage Facebook chuyên nghiệp với content đều đặn và tương tác cao.",
    features: ["Content planning", "Daily posting", "Community management", "Analytics report"],
    price: "Từ 8.000.000đ/tháng",
    group: "Dịch vụ quản lý truyền thông",
  },
  {
    category: "management",
    icon: Video,
    title: "Quản lý kênh TikTok/YouTube",
    description: "Phát triển kênh TikTok/YouTube với chiến lược content và tối ưu thuật toán.",
    features: ["Content strategy", "Video optimization", "Audience growth", "Monetization"],
    price: "Từ 10.000.000đ/tháng",
    group: "Dịch vụ quản lý truyền thông",
  },
  {
    category: "management",
    icon: Globe,
    title: "Quản lý nội dung Website/SEO",
    description: "Quản lý và tối ưu nội dung website để tăng traffic và ranking SEO.",
    features: ["Content audit", "SEO optimization", "Regular updates", "Performance tracking"],
    price: "Từ 6.000.000đ/tháng",
    group: "Dịch vụ quản lý truyền thông",
  },

  // 4. Dịch vụ thiết kế – sáng tạo
  {
    category: "design",
    icon: Palette,
    title: "Thiết kế logo, bộ nhận diện thương hiệu",
    description: "Thiết kế logo và bộ nhận diện thương hiệu hoàn chỉnh, độc đáo.",
    features: ["Logo design", "Brand guideline", "Color palette", "Typography"],
    price: "Từ 5.000.000đ",
    group: "Dịch vụ thiết kế – sáng tạo",
  },
  {
    category: "design",
    icon: FileText,
    title: "Thiết kế banner, poster, catalogue",
    description: "Thiết kế các vật liệu marketing chuyên nghiệp và bắt mắt.",
    features: ["Print design", "Digital assets", "Brand consistency", "Multiple formats"],
    price: "Từ 1.000.000đ/design",
    group: "Dịch vụ thiết kế – sáng tạo",
  },
  {
    category: "design",
    icon: Video,
    title: "Dựng TVC quảng cáo",
    description: "Sản xuất TVC quảng cáo chuyên nghiệp cho TV và digital platforms.",
    features: ["Concept development", "Professional filming", "Post-production", "Multiple versions"],
    price: "Từ 50.000.000đ",
    group: "Dịch vụ thiết kế – sáng tạo",
  },

  // 5. Dịch vụ tư vấn & chiến lược
  {
    category: "consulting",
    icon: Lightbulb,
    title: "Tư vấn chiến lược Marketing tổng thể",
    description: "Xây dựng chiến lược marketing toàn diện cho doanh nghiệp.",
    features: ["Market analysis", "Strategy planning", "Implementation roadmap", "KPI setting"],
    price: "Từ 20.000.000đ",
    group: "Dịch vụ tư vấn & chiến lược",
  },
  {
    category: "consulting",
    icon: Star,
    title: "Tư vấn xây dựng thương hiệu",
    description: "Định hướng và phát triển thương hiệu từ ý tưởng đến thực thi.",
    features: ["Brand positioning", "Brand architecture", "Brand strategy", "Implementation plan"],
    price: "Từ 25.000.000đ",
    group: "Dịch vụ tư vấn & chiến lược",
  },
  {
    category: "consulting",
    icon: Target,
    title: "Tư vấn kế hoạch quảng cáo",
    description: "Lập kế hoạch quảng cáo chi tiết cho sản phẩm/dịch vụ mới.",
    features: ["Campaign planning", "Budget allocation", "Channel selection", "Timeline planning"],
    price: "Từ 15.000.000đ",
    group: "Dịch vụ tư vấn & chiến lược",
  },

  // 6. Dịch vụ SEO & Website
  {
    category: "seo",
    icon: Globe,
    title: "Thiết kế website chuẩn SEO",
    description: "Thiết kế website responsive, tối ưu SEO và user experience.",
    features: ["Responsive design", "SEO optimization", "Fast loading", "User-friendly"],
    price: "Từ 20.000.000đ",
    group: "Dịch vụ SEO & Website",
  },
  {
    category: "seo",
    icon: Search,
    title: "Tối ưu SEO từ khóa theo tháng",
    description: "Tối ưu SEO website với từ khóa mục tiêu để tăng ranking Google.",
    features: ["Keyword research", "On-page SEO", "Technical SEO", "Monthly reports"],
    price: "Từ 8.000.000đ/tháng",
    group: "Dịch vụ SEO & Website",
  },
  {
    category: "seo",
    icon: FileText,
    title: "Viết và đăng bài chuẩn SEO",
    description: "Viết và đăng bài content chuẩn SEO để tăng traffic tự nhiên.",
    features: ["SEO content writing", "Keyword optimization", "Regular posting", "Performance tracking"],
    price: "Từ 3.000.000đ/tháng",
    group: "Dịch vụ SEO & Website",
  },
  {
    category: "seo",
    icon: Settings,
    title: "Chăm sóc – bảo trì website",
    description: "Dịch vụ bảo trì, cập nhật và tối ưu hóa website định kỳ.",
    features: ["Regular backups", "Security updates", "Performance optimization", "24/7 support"],
    price: "Từ 2.000.000đ/tháng",
    group: "Dịch vụ SEO & Website",
  },

  // 7. Dịch vụ tổ chức sự kiện & truyền thông offline
  {
    category: "events",
    icon: Calendar,
    title: "Tổ chức sự kiện ra mắt sản phẩm",
    description: "Tổ chức sự kiện ra mắt sản phẩm chuyên nghiệp và ấn tượng.",
    features: ["Event planning", "Venue booking", "Media coverage", "Guest management"],
    price: "Từ 100.000.000đ",
    group: "Dịch vụ tổ chức sự kiện",
  },
  {
    category: "events",
    icon: Users,
    title: "Tổ chức hội thảo, hội nghị",
    description: "Tổ chức hội thảo, hội nghị chuyên nghiệp với đầy đủ trang thiết bị.",
    features: ["Venue setup", "Technical support", "Speaker coordination", "Documentation"],
    price: "Từ 50.000.000đ",
    group: "Dịch vụ tổ chức sự kiện",
  },
  {
    category: "events",
    icon: Video,
    title: "Truyền thông sự kiện",
    description: "Dịch vụ chụp ảnh, quay phim và livestream sự kiện chuyên nghiệp.",
    features: ["Event photography", "Video production", "Live streaming", "Social media coverage"],
    price: "Từ 20.000.000đ",
    group: "Dịch vụ tổ chức sự kiện",
  },

  // 8. Dịch vụ Influencer/KOL Marketing
  {
    category: "influencer",
    icon: Star,
    title: "Booking KOL TikTok/YouTube",
    description: "Kết nối và quản lý chiến dịch với KOL TikTok/YouTube phù hợp.",
    features: ["KOL database", "Campaign management", "Content approval", "Performance tracking"],
    price: "Từ 30.000.000đ/campaign",
    group: "Dịch vụ Influencer/KOL Marketing",
  },
  {
    category: "influencer",
    icon: Users,
    title: "Booking hot fanpage/group Facebook",
    description: "Hợp tác với các fanpage và group Facebook có tầm ảnh hưởng lớn.",
    features: ["Fanpage network", "Content collaboration", "Audience analysis", "ROI tracking"],
    price: "Từ 15.000.000đ/campaign",
    group: "Dịch vụ Influencer/KOL Marketing",
  },
  {
    category: "influencer",
    icon: FileText,
    title: "Booking báo chí, trang tin tức",
    description: "Đăng bài PR trên các trang báo chí và tin tức uy tín.",
    features: ["Media relations", "Press release", "Editorial coverage", "Media monitoring"],
    price: "Từ 10.000.000đ/campaign",
    group: "Dịch vụ Influencer/KOL Marketing",
  },

  // 9. Dịch vụ đào tạo & workshop
  {
    category: "training",
    icon: GraduationCap,
    title: "Đào tạo chạy quảng cáo Facebook/Google",
    description: "Đào tạo team nội bộ về kỹ năng chạy quảng cáo Facebook và Google Ads.",
    features: ["Hands-on training", "Real campaign practice", "Strategy development", "Ongoing support"],
    price: "Từ 20.000.000đ/khóa",
    group: "Dịch vụ đào tạo & workshop",
  },
  {
    category: "training",
    icon: Video,
    title: "Đào tạo xây dựng kênh TikTok bán hàng",
    description: "Hướng dẫn xây dựng và phát triển kênh TikTok để bán hàng hiệu quả.",
    features: ["Content strategy", "Algorithm optimization", "Sales funnel", "Analytics tracking"],
    price: "Từ 15.000.000đ/khóa",
    group: "Dịch vụ đào tạo & workshop",
  },
  {
    category: "training",
    icon: Palette,
    title: "Workshop sáng tạo nội dung",
    description: "Workshop thực hành về content creation, video và design cho marketing.",
    features: ["Creative workshops", "Tool training", "Best practices", "Portfolio development"],
    price: "Từ 25.000.000đ/workshop",
    group: "Dịch vụ đào tạo & workshop",
  },

  // 10. Dịch vụ phân tích & báo cáo
  {
    category: "analytics",
    icon: BarChart3,
    title: "Phân tích thị trường",
    description: "Nghiên cứu và phân tích thị trường chi tiết cho doanh nghiệp.",
    features: ["Market research", "Competitor analysis", "Trend analysis", "Strategic insights"],
    price: "Từ 25.000.000đ",
    group: "Dịch vụ phân tích & báo cáo",
  },
  {
    category: "analytics",
    icon: Target,
    title: "Đo lường hiệu quả chiến dịch Marketing",
    description: "Đánh giá và báo cáo hiệu quả các chiến dịch marketing một cách chi tiết.",
    features: ["Campaign analytics", "ROI measurement", "Performance optimization", "Custom dashboards"],
    price: "Từ 15.000.000đ/tháng",
    group: "Dịch vụ phân tích & báo cáo",
  },
  {
    category: "analytics",
    icon: Users,
    title: "Báo cáo hành vi khách hàng & xu hướng",
    description: "Phân tích hành vi khách hàng và dự đoán xu hướng thị trường.",
    features: ["Customer behavior analysis", "Trend forecasting", "Segmentation analysis", "Actionable insights"],
    price: "Từ 20.000.000đ",
    group: "Dịch vụ phân tích & báo cáo",
  },
]

export function Services() {
  const { dispatch } = useCart()
  const [filteredServices, setFilteredServices] = useState(allServices.slice(0, 6)) // Show first 6 by default
  const [showAllServices, setShowAllServices] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  useEffect(() => {
    const handleFilterServices = (event: CustomEvent) => {
      console.log("[v0] Filter services event received:", event.detail)
      const { category } = event.detail
      setActiveFilter(category)
      const filtered = allServices.filter((service) => service.category === category)
      console.log("[v0] Filtered services:", filtered.length, "services found for category:", category)
      setFilteredServices(filtered)
      setShowAllServices(true)
    }

    console.log("[v0] Adding filterServices event listener")
    window.addEventListener("filterServices", handleFilterServices as EventListener)
    return () => {
      console.log("[v0] Removing filterServices event listener")
      window.removeEventListener("filterServices", handleFilterServices as EventListener)
    }
  }, [])

  const handleAddToCart = (service: any, index: number) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `service-${service.category}-${index}`,
        title: service.title,
        price: service.price,
        description: service.description,
      },
    })
  }

  const handleShowAllServices = () => {
    if (showAllServices && !activeFilter) {
      setFilteredServices(allServices.slice(0, 6))
      setShowAllServices(false)
    } else {
      setFilteredServices(allServices)
      setShowAllServices(true)
      setActiveFilter(null)
    }
  }

  const handleClearFilter = () => {
    setActiveFilter(null)
    setFilteredServices(allServices.slice(0, 6))
    setShowAllServices(false)
  }

  const groupedServices = filteredServices.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, typeof allServices>,
  )

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Dịch vụ của chúng tôi</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Giải pháp truyền thông toàn diện với 10 nhóm dịch vụ chuyên nghiệp
          </p>
          {activeFilter && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Đang hiển thị:</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {filteredServices[0]?.group}
              </span>
              <Button variant="ghost" size="sm" onClick={handleClearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-16">
          {Object.entries(groupedServices).map(([category, services]) => (
            <div key={category} id={`category-${category}`} className="transition-all duration-300 rounded-lg">
              {activeFilter && (
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">{services[0].group}</h3>
                  <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card
                    key={`${service.category}-${index}`}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <div className="flex-1 space-y-4">
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-semibold text-primary">{service.price}</span>
                        </div>
                        <div className="space-y-2">
                          <LearnMoreModal service={service}>
                            <Button variant="ghost" size="sm" className="w-full group/btn justify-center">
                              Tìm hiểu thêm
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </LearnMoreModal>
                          <Button
                            onClick={() => handleAddToCart(service, index)}
                            className="w-full bg-primary hover:bg-primary/90"
                            size="sm"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleShowAllServices}>
            {showAllServices && !activeFilter ? "Thu gọn dịch vụ" : "Xem tất cả dịch vụ"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
