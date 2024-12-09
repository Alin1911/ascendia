'use client'

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useEffect } from "react";
import posthog from "posthog-js";

export default function Register() {
  useEffect(() => {
    posthog.capture('Register Page');
  }
  , []);
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <div className="mt-1">
                    <Input id="name" name="name" type="text" autoComplete="name" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1">
                    <Input id="email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1">
                    <Input id="password" name="password" type="password" autoComplete="new-password" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password-confirm">Confirm password</Label>
                  <div className="mt-1">
                    <Input id="password-confirm" name="password-confirm" type="password" autoComplete="new-password" required />
                  </div>
                </div>

                <div>
                  <Label>I am a:</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="mentee" name="user-type" value="mentee" />
                      <Label htmlFor="mentee" className="ml-2">Mentee (looking for guidance)</Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mentor" name="user-type" value="mentor" />
                      <Label htmlFor="mentor" className="ml-2">Mentor (offering expertise)</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox id="terms" name="terms" required />
                  <Label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the{" "}
                    <Link href="/terms" className="font-medium text-primary hover:text-primary/90">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-medium text-primary hover:text-primary/90">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Create account
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
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          alt="Mentoring background"
        />
      </div>
    </div>
  )
}