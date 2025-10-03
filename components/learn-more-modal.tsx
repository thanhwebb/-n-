"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Users, TrendingUp, Shield, Star, Phone, Mail } from "lucide-react"

interface LearnMoreModalProps {
  service: any
  children: React.ReactNode
}

const getServiceDetails = (service: any) => {
  const baseDetails = {
    overview: `${service.title} là một trong những dịch vụ hàng đầu của GoWithMedia, được thiết kế để mang lại hiệu quả tối đa cho doanh nghiệp của bạn.`,
    benefits: [
      "Tăng nhận diện thương hiệu",
      "Gia tăng doanh số bán hàng",
      "Tiết kiệm chi phí marketing",
      "Đo lường hiệu quả rõ ràng",
    ],
    process: ["Tư vấn và phân tích nhu cầu", "Lập kế hoạch chi tiết", "Triển khai thực hiện", "Theo dõi và tối ưu hóa"],
    timeline: "2-4 tuần",
    guarantee: "Cam kết hoàn tiền 100% nếu không đạt KPI đã thỏa thuận",
  }

  // Customize details based on service category
  switch (service.category) {
    case "ads":
      return {
        ...baseDetails,
        overview: `Dịch vụ ${service.title} giúp doanh nghiệp tiếp cận khách hàng mục tiêu một cách hiệu quả nhất với chi phí tối ưu. Chúng tôi sử dụng công nghệ AI và big data để tối ưu hóa chiến dịch.`,
        benefits: [
          "ROI trung bình 300-500%",
          "Tiếp cận đúng khách hàng mục tiêu",
          "Tối ưu chi phí quảng cáo",
          "Báo cáo chi tiết theo thời gian thực",
        ],
        caseStudy: {
          client: "Thương hiệu thời trang ABC",
          challenge: "Tăng doanh số online trong mùa sale",
          solution: "Chiến dịch quảng cáo đa nền tảng với creative A/B testing",
          result: "Tăng 450% doanh số, giảm 30% chi phí quảng cáo",
        },
      }
    case "content":
      return {
        ...baseDetails,
        overview: `${service.title} tạo ra nội dung chất lượng cao, thu hút và chuyển đổi khách hàng hiệu quả. Đội ngũ creative giàu kinh nghiệm sẽ biến ý tưởng thành hiện thực.`,
        benefits: [
          "Nội dung viral, lan truyền mạnh",
          "Tăng engagement rate 200-400%",
          "Xây dựng cộng đồng trung thành",
          "Chi phí sản xuất tối ưu",
        ],
        caseStudy: {
          client: "Nhà hàng XYZ",
          challenge: "Tăng lượng khách hàng trẻ",
          solution: "Series video TikTok về món ăn trending",
          result: "10M+ views, tăng 200% khách hàng Gen Z",
        },
      }
    case "design":
      return {
        ...baseDetails,
        overview: `${service.title} tạo ra những thiết kế độc đáo, phản ánh đúng giá trị thương hiệu và thu hút khách hàng mục tiêu một cách hiệu quả nhất.`,
        benefits: [
          "Thiết kế độc quyền, không trùng lặp",
          "Tăng nhận diện thương hiệu 300%",
          "Phù hợp mọi nền tảng truyền thông",
          "Bản quyền sở hữu hoàn toàn",
        ],
        caseStudy: {
          client: "Startup công nghệ DEF",
          challenge: "Xây dựng thương hiệu từ zero",
          solution: "Bộ nhận diện thương hiệu hoàn chỉnh",
          result: "Tăng 500% nhận diện, thu hút được Series A",
        },
      }
    default:
      return baseDetails
  }
}

export function LearnMoreModal({ service, children }: LearnMoreModalProps) {
  const details = getServiceDetails(service)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Tìm hiểu thêm: {service.title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="benefits">Lợi ích</TabsTrigger>
            <TabsTrigger value="process">Quy trình</TabsTrigger>
            <TabsTrigger value="case-study">Case Study</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <service.icon className="h-6 w-6 text-primary" />
                  Giới thiệu dịch vụ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{details.overview}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Thời gian thực hiện
                    </h4>
                    <p className="text-sm text-muted-foreground">{details.timeline}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Đội ngũ thực hiện
                    </h4>
                    <p className="text-sm text-muted-foreground">3-5 chuyên gia</p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Cam kết chất lượng
                  </h4>
                  <p className="text-sm text-muted-foreground">{details.guarantee}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Lợi ích khi sử dụng dịch vụ
                </CardTitle>
                <CardDescription>Những giá trị cụ thể mà dịch vụ mang lại cho doanh nghiệp</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {details.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Tại sao chọn GoWithMedia?</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 5+ năm kinh nghiệm trong lĩnh vực truyền thông</li>
                    <li>• Đội ngũ chuyên gia được đào tạo bài bản</li>
                    <li>• Công nghệ và công cụ hiện đại nhất</li>
                    <li>• Hỗ trợ 24/7 trong suốt quá trình hợp tác</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quy trình thực hiện</CardTitle>
                <CardDescription>Các bước chi tiết từ khi bắt đầu đến khi hoàn thành dự án</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {details.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{step}</h4>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 && "Tư vấn miễn phí, phân tích nhu cầu và đưa ra giải pháp phù hợp nhất."}
                          {index === 1 && "Lập kế hoạch chi tiết với timeline, ngân sách và KPI cụ thể."}
                          {index === 2 && "Triển khai thực hiện theo đúng kế hoạch với sự giám sát chặt chẽ."}
                          {index === 3 && "Theo dõi hiệu quả và tối ưu hóa liên tục để đạt kết quả tốt nhất."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Công cụ và phần mềm sử dụng</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Google Analytics</Badge>
                    <Badge variant="secondary">Facebook Business</Badge>
                    <Badge variant="secondary">Adobe Creative Suite</Badge>
                    <Badge variant="secondary">Canva Pro</Badge>
                    <Badge variant="secondary">Hootsuite</Badge>
                    <Badge variant="secondary">SEMrush</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="case-study" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-primary" />
                  Case Study thành công
                </CardTitle>
                <CardDescription>Câu chuyện thành công thực tế từ khách hàng của chúng tôi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {details.caseStudy && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Khách hàng</h4>
                      <p className="text-muted-foreground">{details.caseStudy.client}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Thách thức</h4>
                      <p className="text-muted-foreground">{details.caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Giải pháp</h4>
                      <p className="text-muted-foreground">{details.caseStudy.solution}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Kết quả đạt được</h4>
                      <p className="text-green-700">{details.caseStudy.result}</p>
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Khách hàng nói gì về chúng tôi</h4>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-muted-foreground italic mb-2">
                      "GoWithMedia đã giúp chúng tôi tăng trưởng vượt bậc. Đội ngũ chuyên nghiệp, sáng tạo và luôn đặt
                      lợi ích khách hàng lên hàng đầu."
                    </p>
                    <p className="text-sm font-semibold">- CEO, Công ty ABC</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Phone className="mr-2 h-4 w-4" />
                    Tư vấn miễn phí
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Mail className="mr-2 h-4 w-4" />
                    Gửi yêu cầu báo giá
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
