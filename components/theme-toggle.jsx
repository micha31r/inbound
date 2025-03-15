"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  function changeTheme() {
    if (theme == "light") {
      setTheme("dark")
    } else if (theme == "dark") {
      setTheme("light")
    }
  }

  return (
    <Button variant="ghost" size="icon" className="w-10 h-10 cursor-pointer rounded-lg hover:text-primary" onClick={changeTheme}>
      <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
