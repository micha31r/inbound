"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Image 
            src="/inboundwhite.png" 
            alt="Logo" 
            width={200} 
            height={100} 
            className="block"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-lg px-4 py-5 cursor-pointer" onClick={() => router.push('/auth/login')}>Log in</Button>
          <Button className="text-lg px-4 py-5 cursor-pointer" onClick={() => router.push('/auth/signup')}>Sign up</Button>
        </div>
      </nav>

      <main className="flex flex-col gap-10 items-center text-center">
        <h1 className="text-9xl max-w-8xl font-bold">WELCOME ABOARD,</h1>
        <h1 className="text-8xl max-w-8xl font-bold">STRESS-FREE ONBOARDING</h1>  
        <h2 className="text-2xl max-w-3xl text-opacity-80 text-muted-foreground">Your new onboarding companion, designed to streamline the onboarding process. Say goodbye to the stress and hello to a more efficient, organized, and welcoming onboarding experience.</h2>
        <Button className="text-xl p-8 cursor-pointer rounded-full w-max" onClick={() => router.push('/auth/signup')}>Get started today</Button>
      </main>

      <footer className="flex flex-col w-full items-center">
        <p className="text-muted-foreground">Built for UniHack 2025. Made with love by Team Cube.</p>
      </footer>
    </div>
  );
}