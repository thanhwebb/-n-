"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, TrendingUp, Users, ExternalLink } from "lucide-react"

interface PortfolioDetailModalProps {
  project: {
    title: string
    category: string
    description: string
    image: string
    metrics: Array<{
      icon: any
      value: string
      label: string
    }>
    details?: {
      client: string
      duration: string
      objective: string
      strategy: string[]
      results: string[]
      testimonial?: string
    }
  }
  children: React.ReactNode
}

export function PortfolioDetailModal({ project, children }: PortfolioDetailModalProps) {
  const defaultDetails = {
    client: "Khách hàng doanh nghiệp",
    duration: "3-6 tháng",
    objective: "Tăng trưởng doanh số và nhận diện thương hiệu",
    strategy: [
      "Phân tích thị trường và đối thủ cạnh tranh",
      "Xây dựng chiến lược content phù hợp",
      "Tối ưu hóa ngân sách quảng cáo",
      "Theo dõi và điều chỉnh campaign liên tục",
    ],
    results: [
      "Tăng trưởng doanh số vượt mục tiêu đề ra",
      "Cải thiện đáng kể độ nhận diện thương hiệu",
      "Xây dựng được cộng đồng khách hàng trung thành",
      "ROI tích cực và bền vững",
    ],
    testimonial:
      "GoWithMedia đã giúp chúng tôi đạt được những kết quả vượt ngoài mong đợi. Đội ngũ chuyên nghiệp và chiến lược hiệu quả.",
  }

  const details = project.details || defaultDetails

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <Badge variant="secondary" className="w-fit">
            {project.category}
          </Badge>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-64 object-cover" />
          </div>

          {/* Project Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Khách hàng</p>
                <p className="font-medium">{details.client}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Thời gian</p>
                <p className="font-medium">{details.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Mục tiêu</p>
                <p className="font-medium">Tăng trưởng doanh số</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 rounded-lg">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Mô tả dự án</h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          {/* Strategy */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Chiến lược thực hiện</h3>
            <ul className="space-y-2">
              {details.strategy.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Kết quả đạt được</h3>
            <ul className="space-y-2">
              {details.results.map((result, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <TrendingUp className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          {details.testimonial && (
            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-muted-foreground italic">"{details.testimonial}"</p>
              <p className="text-sm font-medium mt-2">- Khách hàng</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <Button className="bg-primary hover:bg-primary/90">
              <ExternalLink className="mr-2 h-4 w-4" />
              Liên hệ tư vấn dự án tương tự
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
