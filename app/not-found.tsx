import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary md:text-[12rem]">404</h1>
          <div className="relative -mt-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Page Not Found</h2>
        <p className="mb-8 text-pretty text-lg text-muted-foreground">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent opacity-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-12 w-12 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
