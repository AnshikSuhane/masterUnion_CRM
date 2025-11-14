/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Sales Executive";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@test.com",
    password: "password123",
    role: "Admin" as const,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@test.com",
    password: "password123",
    role: "Manager" as const,
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex@test.com",
    password: "password123",
    role: "Sales Executive" as const,
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState(MOCK_USERS);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("crm_auth_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e: any) {
        localStorage.removeItem("crm_auth_user");
      }
    }

    const savedUsers = localStorage.getItem("crm_registered_users");
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (e) {
        localStorage.removeItem("crm_registered_users");
      }
    }
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = registeredUsers.find(
          (u) => u.email === email && u.password === password,
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword as User);
          localStorage.setItem(
            "crm_auth_user",
            JSON.stringify(userWithoutPassword),
          );
          resolve({ success: true });
        } else {
          resolve({ success: false, error: "Invalid email or password" });
        }
      }, 500); // Simulate network delay
    });
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if email already exists
        if (registeredUsers.some((u) => u.email === email)) {
          resolve({ success: false, error: "Email already registered" });
          return;
        }

        // Validate inputs
        if (!name || !email || !password) {
          resolve({ success: false, error: "All fields are required" });
          return;
        }

        if (password.length < 6) {
          resolve({
            success: false,
            error: "Password must be at least 6 characters",
          });
          return;
        }

        // Create new user
        const newUser = {
          id: String(registeredUsers.length + 1),
          name,
          email,
          password,
          role: (role || "Sales Executive") as
            | "Admin"
            | "Manager"
            | "Sales Executive",
        };

        const updatedUsers = [...registeredUsers, newUser];
        setRegisteredUsers(updatedUsers);
        localStorage.setItem(
          "crm_registered_users",
          JSON.stringify(updatedUsers),
        );

        // Auto-login after signup
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem(
          "crm_auth_user",
          JSON.stringify(userWithoutPassword),
        );

        resolve({ success: true });
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("crm_auth_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
