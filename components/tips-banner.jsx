import BannerImage from "@/public/tips-gradient.png"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

export function TipsBanner() {
  return (
    <InfoDialog>
      <div className="relative w-full max-w-6xl h-max cursor-pointer">
        <Image src={BannerImage} alt="orange gradient" className="absolute w-full h-full object-cover rounded-xl dark:brightness-[0.6]" />
        <div className="relative space-y-4 p-5">
          <div className="flex justify-between gap-5 items-center">
            <h3 className="font-semibold text-2xl">Recommended info for you</h3>
            <ArrowRight className="size-7" />
          </div>
          <p className="text-sm max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
        </div>
      </div>
    </InfoDialog>
  )
}

function InfoDialog({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-secondary">
        <DialogHeader>
          <DialogTitle>Did you know?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm dark:text-foreground/70">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="border border-secondary-accent hover:!bg-secondary-accent/50 rounded-full w-full cursor-pointer">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}