import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Award, Users, Zap } from "lucide-react"

export function About() {
  const achievements = [
    {
      icon: Users,
      number: "200+",
      label: "Khách hàng tin tưởng",
    },
    {
      icon: Award,
      number: "15+",
      label: "Giải thưởng",
    },
    {
      icon: Zap,
      number: "99%",
      label: "Tỷ lệ thành công",
    },
  ]

  const values = [
    "Sáng tạo không giới hạn",
    "Chất lượng hàng đầu",
    "Dịch vụ tận tâm",
    "Giá cả cạnh tranh",
    "Hỗ trợ 24/7",
    "Đội ngũ chuyên nghiệp",
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-balance">Về GoWithMedia</h2>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Với nhiều năm kinh nghiệm trong lĩnh vực truyền thông và marketing digital, GoWithMedia đã trở thành đối
                tác tin cậy của hàng trăm doanh nghiệp từ startup đến tập đoàn lớn.
              </p>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Chúng tôi không chỉ cung cấp dịch vụ mà còn đồng hành cùng khách hàng trong hành trình phát triển thương
                hiệu, mang lại giá trị thực sự và kết quả bền vững.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <achievement.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{achievement.number}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="p-8">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Tại sao chọn chúng tôi?</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Chiến lược toàn diện</h4>
                      <p className="text-sm text-muted-foreground">
                        Phân tích thị trường và xây dựng chiến lược phù hợp với từng doanh nghiệp
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Thực hiện chuyên nghiệp</h4>
                      <p className="text-sm text-muted-foreground">
                        Đội ngũ chuyên gia giàu kinh nghiệm thực hiện dự án với chất lượng cao nhất
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Theo dõi & tối ưu</h4>
                      <p className="text-sm text-muted-foreground">
                        Giám sát hiệu quả và liên tục cải thiện để đạt kết quả tốt nhất
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
