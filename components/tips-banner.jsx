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
            <h3 className="font-semibold text-2xl">Daily Employee Tip</h3>
            <ArrowRight className="size-7" />
          </div>
          <p className="text-sm max-w-xl">Did you know you can get reimbursed for wellness-related purchases? Employees receive $300 per year to spend on eligible wellness expenses, from gym memberships to meditation apps. Make sure to submit your claims before June 30th, as unused funds don’t roll over!</p>
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
          <p>Our company offers a $300 annual reimbursement for wellness-related purchases, encouraging employees to prioritize their health and well-being. This benefit covers a variety of expenses, including gym memberships, fitness classes, meditation apps, ergonomic office equipment, and more. To take advantage of this perk, simply keep your receipts and submit a reimbursement request through the internal benefits portal before June 30th, as unused funds do not carry over to the next year.</p>
          <p>Investing in your well-being can improve focus, productivity, and overall job satisfaction. Whether you want to try a new fitness program, upgrade your home office setup, or explore stress management tools, this benefit is here to support you. Don’t let your $300 go to waste—make the most of it before the deadline!</p>
          <p>Not sure what qualifies for reimbursement? Check the internal benefits page for a full list of eligible expenses or reach out to HR for guidance. If you’ve already made a wellness-related purchase this year, take a few minutes to submit your claim—it’s a simple way to maximize your benefits and invest in yourself!</p>
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