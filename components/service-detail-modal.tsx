"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Clock, Users, Star, MessageCircle, TrendingUp, Shield } from "lucide-react"

interface ServiceDetailProps {
  service: {
    title: string
    description: string
    features: string[]
    price: string
    icon: React.ComponentType<{ className?: string }>
  }
  children: React.ReactNode
}

const serviceDetails = {
  "Làm tin quảng cáo": {
    fullDescription:
      "Dịch vụ tạo nội dung quảng cáo chuyên nghiệp với đội ngũ copywriter và designer giàu kinh nghiệm. Chúng tôi tạo ra những thông điệp quảng cáo thu hút, phù hợp với từng đối tượng khách hàng và nền tảng truyền thông.",
    process: [
      "Phân tích đối tượng khách hàng",
      "Nghiên cứu thị trường và đối thủ",
      "Tạo concept và ý tưởng sáng tạo",
      "Viết copy và thiết kế visual",
      "Test và tối ưu hóa",
    ],
    deliverables: [
      "5-10 bản copy quảng cáo khác nhau",
      "Thiết kế visual cho từng bản copy",
      "Báo cáo phân tích đối tượng",
      "Hướng dẫn sử dụng và tối ưu",
    ],
    timeline: "3-5 ngày làm việc",
    teamSize: "2-3 chuyên gia",
  },
  "Chạy quảng cáo": {
    fullDescription:
      "Dịch vụ quản lý và tối ưu hóa chiến dịch quảng cáo trên các nền tảng Facebook Ads, Google Ads, TikTok Ads. Đội ngũ chuyên gia với kinh nghiệm thực chiến sẽ giúp tối ưu ROI và đạt được mục tiêu kinh doanh.",
    process: [
      "Thiết lập tài khoản quảng cáo",
      "Nghiên cứu từ khóa và đối tượng",
      "Tạo và launch chiến dịch",
      "Theo dõi và tối ưu hàng ngày",
      "Báo cáo kết quả định kỳ",
    ],
    deliverables: [
      "Setup tài khoản quảng cáo chuyên nghiệp",
      "Chiến dịch quảng cáo được tối ưu",
      "Báo cáo hiệu suất hàng tuần",
      "Tư vấn chiến lược dài hạn",
    ],
    timeline: "Liên tục theo tháng",
    teamSize: "1-2 chuyên gia",
  },
  "Tạo tin TikTok": {
    fullDescription:
      "Sản xuất video TikTok chất lượng cao với nội dung viral, trending. Đội ngũ content creator hiểu rõ xu hướng và thuật toán TikTok để tạo ra những video thu hút triệu view.",
    process: [
      "Nghiên cứu trend và hashtag hot",
      "Lên kịch bản và storyboard",
      "Quay và dựng video chuyên nghiệp",
      "Tối ưu cho thuật toán TikTok",
      "Hỗ trợ đăng bài và tương tác",
    ],
    deliverables: [
      "5-10 video TikTok chất lượng cao",
      "Kịch bản chi tiết cho từng video",
      "Hashtag strategy phù hợp",
      "Hướng dẫn đăng bài tối ưu",
    ],
    timeline: "5-7 ngày làm việc",
    teamSize: "3-4 chuyên gia",
  },
  "Tiếp cận người dùng": {
    fullDescription:
      "Xây dựng chiến lược tiếp cận khách hàng đa kênh, tăng độ nhận diện thương hiệu và tạo kết nối với đối tượng mục tiêu thông qua các touchpoint khác nhau.",
    process: [
      "Phân tích customer journey",
      "Xác định touchpoint quan trọng",
      "Thiết kế chiến lược đa kênh",
      "Triển khai và theo dõi",
      "Tối ưu dựa trên dữ liệu",
    ],
    deliverables: [
      "Bản đồ customer journey chi tiết",
      "Chiến lược tiếp cận đa kênh",
      "Content cho từng touchpoint",
      "Hệ thống tracking và đo lường",
    ],
    timeline: "7-10 ngày làm việc",
    teamSize: "2-3 chuyên gia",
  },
  "Sản xuất nội dung": {
    fullDescription:
      "Tạo nội dung chất lượng cao cho website, blog, social media với đội ngũ content writer chuyên nghiệp. Nội dung được tối ưu SEO và phù hợp với từng nền tảng truyền thông.",
    process: [
      "Nghiên cứu từ khóa và chủ đề",
      "Lập kế hoạch content calendar",
      "Viết và biên tập nội dung",
      "Tối ưu SEO và format",
      "Review và hoàn thiện",
    ],
    deliverables: [
      "20-30 bài viết chất lượng cao",
      "Content calendar chi tiết",
      "Hình ảnh minh họa phù hợp",
      "Báo cáo SEO performance",
    ],
    timeline: "10-14 ngày làm việc",
    teamSize: "2-3 chuyên gia",
  },
  "Thiết kế sáng tạo": {
    fullDescription:
      "Thiết kế logo, banner, branding kit hoàn chỉnh với phong cách độc đáo, phù hợp với định hướng thương hiệu. Đội ngũ designer giàu kinh nghiệm sẽ tạo ra bộ nhận diện thương hiệu ấn tượng.",
    process: [
      "Tìm hiểu thương hiệu và yêu cầu",
      "Nghiên cứu thị trường và xu hướng",
      "Tạo concept và mood board",
      "Thiết kế và refine",
      "Hoàn thiện và bàn giao file",
    ],
    deliverables: [
      "Logo với nhiều phiên bản khác nhau",
      "Bộ nhận diện thương hiệu hoàn chỉnh",
      "Template banner, poster",
      "Guideline sử dụng chi tiết",
    ],
    timeline: "5-7 ngày làm việc",
    teamSize: "1-2 designer",
  },
  "Quảng cáo Facebook & Instagram": {
    fullDescription:
      "Dịch vụ quản lý chiến dịch quảng cáo chuyên nghiệp trên Facebook và Instagram với đội ngũ chuyên gia có kinh nghiệm 5+ năm. Chúng tôi tối ưu hóa chi phí quảng cáo và tăng tỷ lệ chuyển đổi thông qua việc phân tích sâu đối tượng khách hàng và tối ưu creative.",
    process: [
      "Phân tích business và xác định mục tiêu",
      "Nghiên cứu đối tượng khách hàng chi tiết",
      "Thiết lập pixel tracking và conversion",
      "Tạo creative và copy thu hút",
      "Launch và tối ưu chiến dịch hàng ngày",
      "A/B test liên tục để cải thiện hiệu suất",
    ],
    deliverables: [
      "Setup tài khoản Business Manager chuyên nghiệp",
      "Chiến dịch quảng cáo được tối ưu cho từng mục tiêu",
      "Creative library với 20+ mẫu quảng cáo",
      "Báo cáo hiệu suất chi tiết hàng tuần",
      "Dashboard theo dõi real-time",
      "Tư vấn chiến lược dài hạn",
    ],
    timeline: "Setup 2-3 ngày, quản lý liên tục",
    teamSize: "2-3 chuyên gia",
    learnMore: {
      benefits: [
        "Tăng ROI trung bình 150-300% so với tự chạy",
        "Giảm chi phí quảng cáo 30-50% nhờ tối ưu targeting",
        "Tăng tỷ lệ chuyển đổi 40-80% với creative được tối ưu",
        "Tiết kiệm 20-30 giờ/tuần cho doanh nghiệp",
      ],
      caseStudy: "Khách hàng ABC tăng doanh số 250% sau 3 tháng với chi phí quảng cáo chỉ tăng 50%",
      tools: ["Facebook Ads Manager", "Google Analytics", "Hotjar", "Canva Pro", "Hootsuite"],
      guarantee: "Cam kết ROI tối thiểu 200% hoặc hoàn tiền trong 30 ngày đầu",
    },
  },
  "Quảng cáo Google Ads": {
    fullDescription:
      "Dịch vụ quản lý Google Ads toàn diện bao gồm Search, Display, Shopping và YouTube Ads. Đội ngũ Google Ads certified sẽ giúp doanh nghiệp xuất hiện đúng thời điểm khách hàng tìm kiếm sản phẩm/dịch vụ.",
    process: [
      "Audit tài khoản hiện tại (nếu có)",
      "Nghiên cứu từ khóa và đối thủ cạnh tranh",
      "Thiết lập cấu trúc tài khoản tối ưu",
      "Tạo ads copy và landing page",
      "Launch và theo dõi performance",
      "Tối ưu bid strategy và targeting",
    ],
    deliverables: [
      "Tài khoản Google Ads được cấu trúc chuyên nghiệp",
      "Danh sách từ khóa 500+ keywords được nghiên cứu",
      "20+ ads copy cho các nhóm sản phẩm",
      "Landing page tối ưu chuyển đổi",
      "Báo cáo performance hàng tuần",
      "Chiến lược bid tự động",
    ],
    timeline: "Setup 3-5 ngày, quản lý liên tục",
    teamSize: "2 chuyên gia",
    learnMore: {
      benefits: [
        "Xuất hiện top 3 Google trong 24-48h",
        "Chi phí per click thấp hơn 25-40% nhờ Quality Score cao",
        "Tăng traffic chất lượng 200-400%",
        "Tracking chính xác ROI từng keyword",
      ],
      caseStudy: "Công ty XYZ tăng leads 180% và giảm cost per lead 35% trong 2 tháng",
      tools: ["Google Ads", "Google Analytics", "Google Tag Manager", "SEMrush", "Ahrefs"],
      guarantee: "Cam kết xuất hiện top 5 cho ít nhất 70% keywords mục tiêu",
    },
  },
  "Video Content cho TikTok": {
    fullDescription:
      "Sản xuất video TikTok viral với đội ngũ content creator Gen Z hiểu rõ trends và thuật toán. Chúng tôi tạo ra những video thu hút triệu views và tăng follower nhanh chóng cho thương hiệu.",
    process: [
      "Nghiên cứu trend và competitor analysis",
      "Brainstorm concept phù hợp với brand",
      "Lên script và storyboard chi tiết",
      "Casting talent và chuẩn bị props",
      "Quay video với thiết bị chuyên nghiệp",
      "Edit và tối ưu cho thuật toán TikTok",
    ],
    deliverables: [
      "10-15 video TikTok chất lượng 4K",
      "Script và storyboard cho từng video",
      "Hashtag strategy cho mỗi video",
      "Schedule đăng bài tối ưu",
      "Hướng dẫn tương tác với audience",
      "Backup content cho 1 tháng",
    ],
    timeline: "7-10 ngày làm việc",
    teamSize: "4-5 chuyên gia",
    learnMore: {
      benefits: [
        "Tăng follower trung bình 500-2000/tháng",
        "Reach trung bình 100K-1M views/video",
        "Tăng brand awareness 300-500%",
        "Chi phí thấp hơn 80% so với quảng cáo truyền thống",
      ],
      caseStudy: "Brand DEF đạt 2.5M views và 15K followers chỉ trong 1 tháng",
      tools: ["CapCut Pro", "Adobe Premiere", "Canva", "TikTok Analytics", "Later"],
      guarantee: "Cam kết ít nhất 3/10 video đạt 50K+ views",
    },
  },
  "Email Marketing": {
    fullDescription:
      "Xây dựng hệ thống email marketing tự động hóa giúp nurture leads và tăng customer lifetime value. Từ thiết kế template đến automation workflow, chúng tôi tối ưu mọi touchpoint trong customer journey.",
    process: [
      "Audit email list và segmentation",
      "Thiết kế email template responsive",
      "Setup automation workflow",
      "Tạo content cho email sequence",
      "A/B test subject lines và content",
      "Tối ưu deliverability và open rate",
    ],
    deliverables: [
      "5-10 email template chuyên nghiệp",
      "Automation workflow hoàn chỉnh",
      "Email sequence cho 6 tháng",
      "Segmentation strategy chi tiết",
      "Dashboard tracking performance",
      "Hướng dẫn maintain và scale",
    ],
    timeline: "10-14 ngày làm việc",
    teamSize: "2-3 chuyên gia",
    learnMore: {
      benefits: [
        "Tăng open rate lên 25-35%",
        "Click-through rate cải thiện 40-60%",
        "ROI trung bình $42 cho mỗi $1 đầu tư",
        "Tự động hóa 80% quy trình marketing",
      ],
      caseStudy: "Startup GHI tăng revenue 120% nhờ email automation trong 6 tháng",
      tools: ["Mailchimp", "Klaviyo", "ConvertKit", "Canva", "Google Analytics"],
      guarantee: "Cam kết tăng open rate ít nhất 15% trong 60 ngày",
    },
  },
  "Thiết kế Branding": {
    fullDescription:
      "Tạo bộ nhận diện thương hiệu hoàn chỉnh từ logo đến guideline, giúp doanh nghiệp xây dựng hình ảnh chuyên nghiệp và nhất quán trên mọi touchpoint.",
    process: [
      "Brand discovery và competitor research",
      "Tạo mood board và concept direction",
      "Thiết kế logo với nhiều variations",
      "Phát triển color palette và typography",
      "Tạo brand guideline chi tiết",
      "Apply branding lên các materials",
    ],
    deliverables: [
      "Logo với 10+ variations khác nhau",
      "Brand guideline 30-50 trang",
      "Color palette và typography system",
      "Business card, letterhead templates",
      "Social media templates",
      "File nguồn đầy đủ (AI, PSD, SVG)",
    ],
    timeline: "10-15 ngày làm việc",
    teamSize: "2 designers",
    learnMore: {
      benefits: [
        "Tăng brand recognition 60-80%",
        "Cải thiện trust và credibility",
        "Nhất quán visual trên mọi platform",
        "Tiết kiệm 50% thời gian design sau này",
      ],
      caseStudy: "Công ty JKL tăng inquiries 90% sau khi rebrand hoàn toàn",
      tools: ["Adobe Illustrator", "Photoshop", "Figma", "Canva Pro", "Pantone"],
      guarantee: "Unlimited revisions cho đến khi khách hàng 100% hài lòng",
    },
  },
  "SEO & Website Optimization": {
    fullDescription:
      "Tối ưu website toàn diện để đạt top ranking Google và tăng organic traffic. Từ technical SEO đến content optimization, chúng tôi áp dụng white-hat techniques mới nhất.",
    process: [
      "Technical SEO audit toàn diện",
      "Keyword research và competitor analysis",
      "On-page optimization",
      "Content strategy và creation",
      "Link building campaign",
      "Monitor và report progress",
    ],
    deliverables: [
      "SEO audit report chi tiết 50+ trang",
      "Keyword strategy cho 6-12 tháng",
      "Technical fixes implementation",
      "20-30 bài content tối ưu SEO",
      "Backlink building campaign",
      "Monthly ranking reports",
    ],
    timeline: "Setup 2 tuần, ongoing 6-12 tháng",
    teamSize: "3-4 chuyên gia",
    learnMore: {
      benefits: [
        "Tăng organic traffic 150-400% trong 6 tháng",
        "Cải thiện ranking cho 80% target keywords",
        "Tăng domain authority 20-40 points",
        "ROI dài hạn cao nhất trong digital marketing",
      ],
      caseStudy: "Website MNO tăng từ 1K lên 25K visitors/tháng trong 8 tháng",
      tools: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "GTMetrix"],
      guarantee: "Cam kết top 10 Google cho ít nhất 50% keywords trong 6 tháng",
    },
  },
  "Event Marketing": {
    fullDescription:
      "Tổ chức và marketing sự kiện từ A-Z, từ workshop nhỏ đến conference lớn. Chúng tôi đảm bảo sự kiện thành công với attendance cao và engagement tốt.",
    process: [
      "Event planning và concept development",
      "Venue selection và logistics",
      "Marketing campaign multi-channel",
      "Registration system setup",
      "Event execution và live support",
      "Post-event analysis và follow-up",
    ],
    deliverables: [
      "Event plan chi tiết timeline",
      "Marketing materials (poster, banner, etc.)",
      "Registration landing page",
      "Social media campaign",
      "Live streaming setup (nếu cần)",
      "Post-event report và leads",
    ],
    timeline: "4-8 tuần preparation",
    teamSize: "5-8 chuyên gia",
    learnMore: {
      benefits: [
        "Tăng brand awareness 200-500%",
        "Generate 100-500 qualified leads/event",
        "Networking opportunities với industry leaders",
        "Content marketing cho 6-12 tháng",
      ],
      caseStudy: "Event PQR thu hút 500+ attendees và generate 150 hot leads",
      tools: ["Eventbrite", "Zoom", "Canva", "Mailchimp", "Google Analytics"],
      guarantee: "Cam kết đạt ít nhất 80% target attendance",
    },
  },
  "Influencer Marketing": {
    fullDescription:
      "Kết nối thương hiệu với influencers phù hợp để tăng reach và credibility. Chúng tôi có network 1000+ influencers từ micro đến macro across các ngành.",
    process: [
      "Influencer research và vetting",
      "Campaign strategy development",
      "Outreach và negotiation",
      "Content brief và approval",
      "Campaign execution và monitoring",
      "Performance analysis và reporting",
    ],
    deliverables: [
      "List 20-50 influencers phù hợp",
      "Campaign strategy document",
      "Content brief templates",
      "Negotiated rates và contracts",
      "Campaign monitoring dashboard",
      "ROI analysis report",
    ],
    timeline: "3-4 tuần cho 1 campaign",
    teamSize: "3-4 chuyên gia",
    learnMore: {
      benefits: [
        "Reach 500K-5M người dùng/campaign",
        "Engagement rate cao hơn 300% vs ads",
        "Tăng brand trust và credibility",
        "Cost-effective hơn traditional advertising",
      ],
      caseStudy: "Brand STU đạt 2M reach và 15% sales increase qua influencer campaign",
      tools: ["AspireIQ", "Upfluence", "Creator.co", "Google Analytics", "Social Blade"],
      guarantee: "Cam kết đạt minimum reach theo agreement",
    },
  },
  "Training & Workshop": {
    fullDescription:
      "Đào tạo digital marketing cho team nội bộ, từ basic đến advanced. Curriculum được customize theo nhu cầu cụ thể của từng doanh nghiệp.",
    process: [
      "Training needs assessment",
      "Curriculum customization",
      "Material preparation",
      "Interactive workshop delivery",
      "Hands-on practice sessions",
      "Post-training support và Q&A",
    ],
    deliverables: [
      "Customized training curriculum",
      "Workshop materials và slides",
      "Hands-on exercises và case studies",
      "Certificate of completion",
      "30-day post-training support",
      "Resource library access",
    ],
    timeline: "2-3 ngày workshop + 1 tuần prep",
    teamSize: "2-3 trainers",
    learnMore: {
      benefits: [
        "Nâng cao skill team 200-300%",
        "Giảm dependency vào agency",
        "Tăng in-house capability",
        "ROI dài hạn cho investment",
      ],
      caseStudy: "Team VWX tự chạy ads hiệu quả sau 3 ngày training, tiết kiệm 50% budget",
      tools: ["Zoom", "Google Workspace", "Canva", "Practice accounts", "Resource portal"],
      guarantee: "100% satisfaction hoặc free re-training",
    },
  },
  "Analytics & Reporting": {
    fullDescription:
      "Thiết lập hệ thống tracking và báo cáo toàn diện để đo lường ROI chính xác của mọi marketing activities. Data-driven decision making cho growth bền vững.",
    process: [
      "Current tracking audit",
      "KPI definition và goal setting",
      "Tracking implementation",
      "Dashboard setup và customization",
      "Automated reporting setup",
      "Training team sử dụng dashboard",
    ],
    deliverables: [
      "Comprehensive tracking setup",
      "Custom dashboard với real-time data",
      "Automated weekly/monthly reports",
      "KPI tracking system",
      "Data visualization templates",
      "Training documentation",
    ],
    timeline: "2-3 tuần setup + ongoing support",
    teamSize: "2-3 analysts",
    learnMore: {
      benefits: [
        "Tăng ROI 50-100% nhờ data insights",
        "Giảm wasted spend 30-50%",
        "Faster decision making",
        "Clear attribution cho mọi channel",
      ],
      caseStudy: "Company YZ tối ưu budget allocation và tăng overall ROI 85%",
      tools: ["Google Analytics 4", "Google Tag Manager", "Data Studio", "Facebook Analytics", "Custom dashboards"],
      guarantee: "100% accurate tracking setup hoặc free rework",
    },
  },
}

export function ServiceDetailModal({ service, children }: ServiceDetailProps) {
  const [isOpen, setIsOpen] = useState(false)
  const details = serviceDetails[service.title as keyof typeof serviceDetails]

  if (!details) return <>{children}</>

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <service.icon className="h-5 w-5 text-primary" />
            </div>
            <span>{service.title}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
            <TabsTrigger value="learn-more">Tìm hiểu thêm</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Mô tả dịch vụ</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Tính năng chính</h3>
              <div className="grid gap-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Thời gian thực hiện
                </h4>
                <Badge variant="outline">{details.timeline}</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Đội ngũ thực hiện
                </h4>
                <Badge variant="outline">{details.teamSize}</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <span className="text-2xl font-bold text-primary">{service.price}</span>
                <p className="text-sm text-muted-foreground">Giá có thể thay đổi tùy theo yêu cầu cụ thể</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Đặt dịch vụ ngay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Mô tả chi tiết</h3>
              <p className="text-muted-foreground leading-relaxed">{details.fullDescription}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Quy trình thực hiện
              </h3>
              <div className="space-y-3">
                {details.process.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Sản phẩm bàn giao
              </h3>
              <div className="grid gap-2">
                {details.deliverables.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learn-more" className="space-y-6">
            {details.learnMore && (
              <>
                <div>
                  <h3 className="font-semibold mb-3 text-primary flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Lợi ích vượt trội
                  </h3>
                  <div className="grid gap-3">
                    {details.learnMore.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium text-green-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-3 text-blue-900 flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    Case Study Thành Công
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed mb-4">{details.learnMore.caseStudy}</p>
                  <div className="flex items-center space-x-4 text-xs text-blue-700">
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      <span>Tăng trưởng bền vững</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="mr-1 h-3 w-3" />
                      <span>Kết quả đã được xác minh</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Tools & Technologies Chuyên Nghiệp
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {details.learnMore.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="text-xs justify-center py-2">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Chúng tôi sử dụng các công cụ hàng đầu trong ngành để đảm bảo chất lượng và hiệu quả tối ưu.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-3 text-green-900 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Cam Kết Chất Lượng
                  </h4>
                  <p className="text-green-800 text-sm font-medium mb-3">{details.learnMore.guarantee}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-green-700">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3" />
                      <span>Hỗ trợ 24/7 trong quá trình thực hiện</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3" />
                      <span>Báo cáo tiến độ hàng tuần</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3" />
                      <span>Revision không giới hạn</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3" />
                      <span>Bảo hành kết quả 6 tháng</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-900">💡 Tại sao nên bắt đầu ngay?</h4>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Thị trường cạnh tranh ngày càng khốc liệt</li>
                    <li>• Chi phí marketing sẽ tăng theo thời gian</li>
                    <li>• Cơ hội vàng để vượt qua đối thủ</li>
                    <li>• ROI cao nhất khi bắt đầu sớm</li>
                  </ul>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Câu hỏi thường gặp</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">❓ Tôi có cần chuẩn bị gì trước khi bắt đầu?</h4>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi sẽ hướng dẫn bạn chuẩn bị mọi thứ cần thiết. Thông thường chỉ cần thông tin về doanh
                    nghiệp, mục tiêu và ngân sách dự kiến.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">⏰ Khi nào tôi sẽ thấy kết quả?</h4>
                  <p className="text-sm text-muted-foreground">
                    Kết quả ban đầu thường xuất hiện trong 1-2 tuần đầu. Kết quả tối ưu đạt được sau 1-3 tháng tùy thuộc
                    vào loại dịch vụ và quy mô dự án.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">💰 Có phát sinh chi phí nào khác không?</h4>
                  <p className="text-sm text-muted-foreground">
                    Giá đã bao gồm tất cả chi phí thực hiện. Chỉ có thể phát sinh thêm chi phí quảng cáo (ad spend) nếu
                    bạn chọn dịch vụ chạy ads.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">🔄 Nếu tôi không hài lòng với kết quả thì sao?</h4>
                  <p className="text-sm text-muted-foreground">
                    Chúng tôi cam kết làm việc đến khi bạn hài lòng 100%. Nếu không đạt được cam kết, chúng tôi sẽ hoàn
                    tiền hoặc làm lại miễn phí.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">📞 Tôi có được hỗ trợ trong quá trình thực hiện?</h4>
                  <p className="text-sm text-muted-foreground">
                    Có, bạn sẽ có dedicated account manager và được hỗ trợ 24/7 qua phone, email, và chat trong suốt quá
                    trình hợp tác.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">📈 Làm sao để theo dõi tiến độ dự án?</h4>
                  <p className="text-sm text-muted-foreground">
                    Bạn sẽ nhận được báo cáo tiến độ hàng tuần và có quyền truy cập dashboard để theo dõi real-time
                    progress và kết quả.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2 text-blue-900">🤝 Sẵn sàng bắt đầu?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Đặt lịch tư vấn miễn phí 30 phút để thảo luận chi tiết về dự án của bạn.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Tư vấn miễn phí
                  </Button>
                  <Button size="sm" variant="outline">
                    Gọi ngay: 0123.456.789
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
