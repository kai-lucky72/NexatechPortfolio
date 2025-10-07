"use client"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasBlogPosts, setHasBlogPosts] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    checkBlogPosts()
  }, [])

  const checkBlogPosts = async () => {
    try {
      const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })

      if (error) throw error
      setHasBlogPosts((count || 0) > 0)
    } catch (error) {
      console.error('Error checking blog posts:', error)
      setHasBlogPosts(false)
    }
  }

  // Helper function to get the correct link for sections
  const getSectionLink = (section: string) => {
    return isHomePage ? `#${section}` : `/#${section}`
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/20 backdrop-blur-md border-b border-gray-200/50 dark:border-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <Image
                    src="/nexatech_logo.png"
                    alt="NexaTech Rwanda"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">NexaTech Rwanda</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {[
              { href: "/", label: "Home" },
              { href: "/about-us", label: "About" },
              { href: getSectionLink("services"), label: "Services" },
              { href: "/our-team", label: "Team" },
              { href: getSectionLink("portfolio"), label: "Portfolio" },
              ...(hasBlogPosts ? [{ href: getSectionLink("blog"), label: "Blog" }] : []),
              { href: "/contact-us", label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-800 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-gray-800 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 dark:bg-black/90 backdrop-blur-xl rounded-lg mt-2 mx-2 border border-gray-200 dark:border-transparent"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-4 space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about-us", label: "About" },
                  { href: getSectionLink("services"), label: "Services" },
                  { href: "/our-team", label: "Team" },
                  { href: getSectionLink("portfolio"), label: "Portfolio" },
                  ...(hasBlogPosts ? [{ href: getSectionLink("blog"), label: "Blog" }] : []),
                  { href: "/contact-us", label: "Contact" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white/80 transition-colors mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}