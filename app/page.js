"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-3">
          <div className="block w-6 h-6 bg-foreground"></div>
          <h3 className="font-bold text-2xl">Cube</h3>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-lg px-4 py-5 cursor-pointer" onClick={() => router.push('/auth/login')}>Log in</Button>
          <Button className="text-lg px-4 py-5 cursor-pointer" onClick={() => router.push('/auth/signup')}>Sign up</Button>
        </div>
      </nav>

      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-8xl max-w-5xl font-medium">The onboarding tool from the future</h1>  
        <h2 className="text-2xl max-w-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
        <Button className="text-xl p-8 cursor-pointer rounded-full w-max" onClick={() => router.push('/auth/signup')}>Get started today</Button>
      </main>

      <footer className="flex flex-col w-full items-center">
        <p className="text-muted-foreground">Built for UniHack 2025. Made with love by Team Cube.</p>
      </footer>
    </div>
  );
}
