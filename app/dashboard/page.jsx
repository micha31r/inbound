"use client"
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <div className="w-full h-svh grid grid-cols-[240px_1fr]">
        <div className="border-r border-border">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Manager Overview</h3>
          </div>
          <div className="flex flex-col gap-1 p-3">
            <Button variant="ghost" className="w-full justify-start p-3 cursor-pointer rounded-lg text-primary bg-primary/10">Onboarding Progress</Button>
            <Button variant="ghost" className="w-full justify-start p-3 cursor-pointer rounded-lg">Teams</Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 max-h-svh">
          <div className="p-5 border-b border-border">
            <h3 className="font-semibold">Onboarding Progress</h3>
          </div>
          <div className="overflow-auto p-5">
            <div className="flex flex-col items-center">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}