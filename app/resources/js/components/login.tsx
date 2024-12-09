'use client'

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useEffect } from "react";
import posthog from "posthog-js";

export default function Login() {
  useEffect(() => {
    posthog.capture('Login Page');
  }
  , []);
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link href="/register" className="font-medium text-primary hover:text-primary/90">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1">
                    <Input id="email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1">
                    <Input id="password" name="password" type="password" autoComplete="current-password" required />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </Label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/90">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt="Mentoring background"
        />
      </div>
    </div>
  )
}