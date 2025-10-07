"use client"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface FooterProps {
  variant?: "primary" | "secondary"
}

export function Footer({ variant = "primary" }: FooterProps) {
  const isPrimary = variant === "primary"
  const [hasBlogPosts, setHasBlogPosts] = useState(false)
  const [companyInfo, setCompanyInfo] = useState<any>({})

  useEffect(() => {
    checkBlogPosts()
    fetchCompanyInfo()
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

  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .single()

      if (error) throw error
      setCompanyInfo(data || {})
    } catch (error) {
      console.error('Error fetching company info:', error)
    }
  }

  // Variant-specific styles
  const containerStyles = cn(
    "text-white",
    isPrimary ? "bg-primary" : "bg-secondary"
  )

  const textSecondaryStyles = cn(
    isPrimary ? "text-primary-foreground/80" : "text-gray-300"
  )

  const textTertiaryStyles = cn(
    isPrimary ? "text-primary-foreground/70" : "text-gray-400"
  )

  const iconBgStyles = cn(
    "rounded-full flex items-center justify-center flex-shrink-0",
    isPrimary ? "bg-white/10" : "bg-white/5"
  )

  const iconStyles = cn(
    isPrimary ? "" : "text-gray-400"
  )

  const dividerStyles = cn(
    "h-px w-full mb-12",
    isPrimary ? "bg-white/20" : "bg-white/10"
  )

  const borderStyles = cn(
    "border-t pt-8",
    isPrimary ? "border-white/20" : "border-white/10"
  )

  const buttonStyles = cn(
    "absolute right-1 top-1 w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors",
    isPrimary ? "bg-gray-900 hover:bg-gray-800" : "bg-primary hover:bg-primary"
  )

  const socialButtonStyles = cn(
    "w-10 h-10 rounded-full border flex items-center justify-center transition-colors",
    isPrimary
      ? "border-white/30 hover:bg-white/10"
      : "border-white/20 hover:bg-white/5"
  )

  const inputFocusStyles = cn(
    "focus:outline-none focus:ring-2",
    isPrimary ? "focus:ring-white/50" : "focus:ring-primary"
  )

  return (
    <footer className={containerStyles}>
      <div className="container mx-auto px-4 py-8">
        {/* Top Section - Logo and Social (Primary variant only) */}
        {isPrimary && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/nexatech_logo.png"
                    alt="NexaTech Rwanda Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NexaTech Rwanda</h3>
                  <p className="text-sm text-primary-foreground/80">Africa's Next Tech Hub</p>
                </div>
              </div>

              <div className="flex gap-3">
                {companyInfo.linkedin && (
                  <Link
                    href={companyInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.twitter && (
                  <Link
                    href={companyInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.facebook && (
                  <Link
                    href={companyInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.instagram && (
                  <Link
                    href={companyInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Divider under top section */}
            <div className={cn("h-px w-full mb-8", isPrimary ? "bg-white/20" : "bg-white/10")} />
          </>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Company Information / Business Contact */}
          <div>
            {!isPrimary && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/nexatech_logo.png"
                    alt="NexaTech Rwanda Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NexaTech Rwanda</h3>
                  <p className="text-sm text-gray-400">Africa's Next Tech Hub</p>
                </div>
              </div>
            )}

            <h4 className="text-lg font-semibold mb-4">
              {isPrimary ? "Business Contact" : "Company Informations"}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={cn(iconBgStyles, "w-8 h-8 mt-0.5")}>
                  <MapPin className={cn("w-4 h-4", iconStyles)} />
                </div>
                <p className={cn("text-sm", textSecondaryStyles)}>Kigali, Rwanda</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(iconBgStyles, "w-8 h-8")}>
                  <Phone className={cn("w-4 h-4", iconStyles)} />
                </div>
                <a href="tel:+250723374650" className={cn("text-sm hover:underline", textSecondaryStyles)}>+250723374650</a>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(iconBgStyles, "w-8 h-8")}> 
                  <Mail className={cn("w-4 h-4", iconStyles)} />
                </div>
                <a href="mailto:nexatech317@gmail.com" className={cn("text-sm hover:underline break-all", textSecondaryStyles)}>nexatech317@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Subscribe Newsletter */}
          <div className={isPrimary ? "" : "lg:order-last"}>
            <h4 className="text-lg font-semibold mb-4">Subscribe Newsletter</h4>
            <p className={cn("text-sm mb-4", textSecondaryStyles)}>
              We invite you to register to read the latest news, offers and events about our company. We promise not
              spam your inbox.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className={cn(
                  "w-full px-4 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-500 pr-12",
                  inputFocusStyles
                )}
              />
              <button
                type="submit"
                className={buttonStyles}
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Social Icons (Secondary variant only) */}
            {!isPrimary && (companyInfo.linkedin || companyInfo.twitter || companyInfo.facebook || companyInfo.instagram) && (
              <div className="flex gap-3 mt-6">
                {companyInfo.linkedin && (
                  <Link
                    href={companyInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.twitter && (
                  <Link
                    href={companyInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.facebook && (
                  <Link
                    href={companyInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                )}
                {companyInfo.instagram && (
                  <Link
                    href={companyInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialButtonStyles}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#services" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/#services" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/#services" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/our-team" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Portfolio
                </Link>
              </li>
              {hasBlogPosts && (
                <li>
                  <Link href="/#blog" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                    Blog
                  </Link>
                </li>
              )}
              <li>
                <Link href="/contact-us" className={cn("text-sm hover:text-white transition-colors", textSecondaryStyles)}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className={borderStyles}>
          <div className={cn("flex flex-col md:flex-row justify-between items-center gap-3 text-sm", textTertiaryStyles)}>
            <p>
              Copyright © 2025 NexaTech Rwanda. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/contact-us" className="hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/about-us" className="hover:text-white transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
