"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_ERROR" }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return { ...state, isLoading: true }
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return { ...state, isLoading: false }
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false }
    default:
      return state
  }
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: "admin" | "customer") => Promise<void>
  logout: () => void
} | null>(null)

const USERS_STORAGE_KEY = "gowithmedia_users"

// Lưu cả role vào localStorage
function getStoredUsers(): Record<string, { name: string; password: string; role: "admin" | "customer" }> {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function storeUser(email: string, name: string, password: string, role: "admin" | "customer" = "customer") {
  if (typeof window === "undefined") return
  try {
    const users = getStoredUsers()
    users[email] = { name, password, role }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch (error) {
    console.error("Failed to store user:", error)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const users = getStoredUsers()
      const userData = users[email]
      if (!userData || userData.password !== password) {
        dispatch({ type: "LOGIN_ERROR" })
        throw new Error("Sai email hoặc mật khẩu")
      }
      const user: User = { id: "1", name: userData.name, email, role: userData.role }
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" })
      throw error
    }
  }

  // Thêm role khi đăng ký, mặc định là customer
  const register = async (name: string, email: string, password: string, role: "admin" | "customer" = "customer") => {
    dispatch({ type: "REGISTER_START" })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      storeUser(email, name, password, role)
      const user: User = { id: "1", name, email, role }
      dispatch({ type: "REGISTER_SUCCESS", payload: user })
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR" })
      throw error
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}