"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { LogIn } from "lucide-react"

export function AuthModal() {
  const { state, login, register, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })
  const [loginError, setLoginError] = useState("") // Thêm state cho lỗi đăng nhập
  const [registerError, setRegisterError] = useState("") // Thêm state cho lỗi đăng ký

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("") // Reset lỗi trước khi đăng nhập
    try {
      await login(loginForm.email, loginForm.password)
      setIsOpen(false)
      setLoginForm({ email: "", password: "" })
    } catch (error) {
      setLoginError("Email hoặc mật khẩu không đúng!") // Hiển thị lỗi
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("") // Reset lỗi trước khi đăng ký
    try {
      await register(registerForm.name, registerForm.email, registerForm.password)
      setIsOpen(false)
      setRegisterForm({ name: "", email: "", password: "" })
    } catch (error) {
      setRegisterError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!") // Hiển thị lỗi
    }
  }

  if (state.isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm">Xin chào, {state.user?.name}</span>
        <Button variant="outline" size="sm" onClick={logout}>
          Đăng xuất
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LogIn className="mr-2 h-4 w-4" />
          Đăng nhập
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đăng nhập / Đăng ký</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Hiển thị lỗi đăng nhập */}
              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Mật khẩu</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={state.isLoading}>
                {state.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Hiển thị lỗi đăng ký */}
              {registerError && (
                <div className="text-red-500 text-sm">{registerError}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="register-name">Họ tên</Label>
                <Input
                  id="register-name"
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Mật khẩu</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={state.isLoading}>
                {state.isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
