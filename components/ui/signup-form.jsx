"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import LoginImage from "@/public/login-gradient.png"
import { useRef } from "react"
import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function SignUpForm({
  className,
  ...props
}) {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const router = useRouter()

  async function signUpNewUser(event) {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value

    if (!email || !password || !confirmPassword) {
      console.error("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.error(error)
    } else {
      console.log(data)
      router.push('/auth/login')
    }
  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={signUpNewUser}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Hello there!</h1>
                <p className="text-muted-foreground text-balance">
                  Create an account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="cube@example.com" required ref={emailRef} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" ref={passwordRef} required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" ref={confirmPasswordRef} required />
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Log in
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image src={LoginImage} alt="orange gradient" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree that this is an amazing product :&#41;
      </div>
    </div>)
  );
}
