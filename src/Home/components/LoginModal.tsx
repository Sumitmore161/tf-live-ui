"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/Home/login/LoginForm";
import { SignUpForm } from "@/Home/login/SignUpForm"; // Import the new form

export const LoginModal = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"login" | "signup">("login"); // Toggle state

  useEffect(() => {
    if (isAuthenticated) setOpen(false);
  }, [isAuthenticated]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-6 py-2 bg-[#F17235] text-white rounded-full text-sm font-medium hover:bg-[#d9622d] transition-colors">
          Log in
        </button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {view === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
        </DialogHeader>
        
        {view === "login" ? <LoginForm /> : <SignUpForm />}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          {view === "login" ? (
            <>
              Don't have an account?{" "}
              <span 
                className="text-[#F17235] cursor-pointer hover:underline font-medium"
                onClick={() => setView("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span 
                className="text-[#F17235] cursor-pointer hover:underline font-medium"
                onClick={() => setView("login")}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};