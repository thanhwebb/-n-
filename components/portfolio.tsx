"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, TrendingUp, Users, Eye, ArrowRight } from "lucide-react"
import { PortfolioDetailModal } from "@/components/portfolio-detail-modal"
import { useState } from "react"

const mainPortfolioItems = [
  {
    title: "Chiến dịch TikTok Viral - Thương hiệu F&B",
    category: "Social Media Marketing",
    description: "Tạo ra 15 video TikTok đạt tổng cộng 2.5M views, tăng 300% lượng khách hàng mới.",
    image: "/viral-tiktok-food-campaign-with-trending-hashtags.jpg",
    metrics: [
      { icon: Eye, value: "2.5M", label: "Views" },
      { icon: Users, value: "50K", label: "Followers mới" },
      { icon: TrendingUp, value: "300%", label: "Tăng trưởng" },
    ],
    details: {
      client: "Chuỗi nhà hàng FastFood Plus",
      duration: "4 tháng",
      objective: "Tăng nhận diện thương hiệu và doanh số",
      strategy: [
        "Nghiên cứu trend TikTok phù hợp với F&B",
        "Sáng tạo content viral với hashtag độc đáo",
        "Hợp tác với micro-influencer địa phương",
        "Tối ưu thời gian đăng bài theo insights",
      ],
      results: [
        "15 video đạt tổng 2.5M views",
        "Tăng 300% lượng khách hàng mới",
        "50K followers mới trên TikTok",
        "ROI 450% so với ngân sách đầu tư",
      ],
      testimonial:
        "GoWithMedia đã biến thương hiệu của chúng tôi thành viral trên TikTok. Doanh số tăng vượt mong đợi!",
    },
  },
  {
    title: "Thiết kế Brand Identity - Startup Tech",
    category: "Branding & Design",
    description: "Xây dựng hệ thống nhận diện thương hiệu hoàn chỉnh cho startup công nghệ.",
    image: "/modern-tech-startup-brand-identity-design-with-log.jpg",
    metrics: [
      { icon: TrendingUp, value: "85%", label: "Brand recall" },
      { icon: Users, value: "200%", label: "User engagement" },
      { icon: Eye, value: "1.2M", label: "Impressions" },
    ],
    details: {
      client: "TechViet Solutions",
      duration: "3 tháng",
      objective: "Xây dựng nhận diện thương hiệu chuyên nghiệp",
      strategy: [
        "Research thị trường và đối thủ cạnh tranh",
        "Thiết kế logo và bộ nhận diện hoàn chỉnh",
        "Xây dựng guideline sử dụng thương hiệu",
        "Triển khai trên tất cả touchpoint",
      ],
      results: [
        "Brand recall tăng 85%",
        "User engagement tăng 200%",
        "1.2M impressions trong tháng đầu",
        "Tăng 150% lượt truy cập website",
      ],
    },
  },
  {
    title: "Chiến dịch Google Ads - E-commerce",
    category: "Paid Advertising",
    description: "Tối ưu hóa chiến dịch Google Ads, giảm 40% chi phí quảng cáo và tăng 150% doanh thu.",
    image: "/successful-google-ads-campaign-dashboard-with-grow.jpg",
    metrics: [
      { icon: TrendingUp, value: "150%", label: "Tăng doanh thu" },
      { icon: Users, value: "40%", label: "Giảm CPC" },
      { icon: Eye, value: "5.2", label: "ROAS" },
    ],
  },
  {
    title: "Content Marketing - Ngành Giáo dục",
    category: "Content Creation",
    description: "Sản xuất 100+ bài viết và video giáo dục, xây dựng cộng đồng 100K thành viên.",
    image: "/educational-content-marketing-with-engaging-videos.jpg",
    metrics: [
      { icon: Users, value: "100K", label: "Community" },
      { icon: Eye, value: "500K", label: "Monthly views" },
      { icon: TrendingUp, value: "250%", label: "Engagement" },
    ],
  },
]

const additionalPortfolioItems = [
  {
    title: "Influencer Campaign - Thời trang",
    category: "Influencer Marketing",
    description: "Hợp tác với 20+ KOL thời trang, tạo buzz cho BST mới và tăng 400% doanh số online.",
    image: "/fashion-influencer-campaign-with-stylish-models.jpg",
    metrics: [
      { icon: Users, value: "20+", label: "KOLs" },
      { icon: Eye, value: "3.8M", label: "Reach" },
      { icon: TrendingUp, value: "400%", label: "Doanh số" },
    ],
  },
  {
    title: "Website Redesign - Bất động sản",
    category: "Web Development",
    description: "Thiết kế lại website bất động sản với UX/UI hiện đại, tăng 250% conversion rate.",
    image: "/modern-real-estate-website-design-with-property.jpg",
    metrics: [
      { icon: TrendingUp, value: "250%", label: "Conversion" },
      { icon: Users, value: "180%", label: "Traffic" },
      { icon: Eye, value: "65%", label: "Bounce rate giảm" },
    ],
  },
  {
    title: "Social Media Strategy - Spa & Wellness",
    category: "Social Media Marketing",
    description: "Xây dựng chiến lược social media toàn diện, tăng 300% booking và 500% followers.",
    image: "/spa-wellness-social-media-content-with-relaxing.jpg",
    metrics: [
      { icon: Users, value: "500%", label: "Followers" },
      { icon: TrendingUp, value: "300%", label: "Booking" },
      { icon: Eye, value: "2.1M", label: "Impressions" },
    ],
  },
]

export function Portfolio() {
  const [showAllProjects, setShowAllProjects] = useState(false)

  const allProjects = showAllProjects ? [...mainPortfolioItems, ...additionalPortfolioItems] : mainPortfolioItems

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Portfolio thành công</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Những dự án tiêu biểu đã mang lại kết quả vượt trội cho khách hàng
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {allProjects.map((item, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                  {item.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <metric.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <PortfolioDetailModal project={item}>
                  <Button variant="ghost" className="w-full group/btn">
                    Xem chi tiết
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </PortfolioDetailModal>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? "Thu gọn dự án" : "Xem thêm dự án"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
