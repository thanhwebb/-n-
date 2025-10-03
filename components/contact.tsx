"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      value: "+84 362 885 180",
      description: "Liên hệ để được tư vấn",
    },
    {
      icon: Mail,
      title: "Email",
      value: "hello@gowithmedia.com",
      description: "Gửi email cho chúng tôi",
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "1 Nguyễn Hữu Thọ, Hải Châu, TP.Đà Nẵng",
      description: "Ghé thăm văn phòng",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      value: "8:00 - 18:00",
      description: "Thứ 2 - Thứ 6",
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-balance">Liên hệ với chúng tôi</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Sẵn sàng bắt đầu dự án của bạn? Hãy liên hệ ngay để được tư vấn miễn phí
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Gửi tin nhắn</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Họ và tên *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Dịch vụ quan tâm</label>
                    <Input
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      placeholder="Chọn dịch vụ"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tin nhắn *</label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mô tả chi tiết về dự án của bạn..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="mr-2 h-5 w-5" />
                  Gửi tin nhắn
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Thông tin liên hệ</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{info.title}</h4>
                      <p className="text-primary font-medium">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
          <Card className="h-96 w-full p-0">
  <CardContent className="p-0 h-full">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.044125766331!2d108.20730621533253!3d16.03741917846109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142199472659f4b%3A0xeb3a94e02328146c!2zMjgwIE5ndXnDqm4gSMO0IFRo4bqjLCBLdXTFs24gVHLhuqFjLCDEkMOiTmc!5e0!3m2!1svi!2s!4v1695739456921!5m2!1svi!2s"
      className="w-full h-full"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </CardContent>
</Card>


            {/* Quick contact buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-auto py-4 bg-transparent">
                <Phone className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Gọi ngay</div>
                  <div className="text-xs text-muted-foreground">Tư vấn miễn phí</div>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="h-auto py-4 bg-transparent">
                <MessageCircle className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Chat Zalo</div>
                  <div className="text-xs text-muted-foreground">Phản hồi nhanh</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
