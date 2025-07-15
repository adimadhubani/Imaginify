"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden" // Add this import

const MobileNav = () => {
  const pathname = usePathname();

  // Color variants matching your sidebar
  const colorVariants = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-yellow-500',
    'from-orange-500 to-red-500',
    'from-violet-500 to-fuchsia-500',
    'from-sky-500 to-blue-500'
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-purple-200 shadow-sm">
      {/* Logo with animated underline */}
      <Link href="/" className="group flex items-center gap-2">
        <div className="relative">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={160}
            height={28}
            className="transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </Link>

      <nav className="flex items-center gap-3">
        <SignedIn>
          {/* User button with colorful border */}
          <div className="p-0.5 rounded-full bg-gradient-to-r">
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 ring-2 ring-purple-300 bg-white"
                }
              }}
            />
          </div>

          {/* Mobile menu sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm hover:shadow-md transition-all">
                <Image 
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={24}
                  height={24}
                  className="cursor-pointer text-purple-800"
                />
                {/* <VisuallyHidden>Open navigation menu</VisuallyHidden> */}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-gradient-to-b from-indigo-50 to-purple-50 p-0 border-l border-purple-200">
              {/* Add the visually hidden title for accessibility */}
              {/* <VisuallyHidden>
                <h2>Navigation Menu</h2>
              </VisuallyHidden> */}
              
              <div className="flex flex-col h-full">
                {/* Header with logo */}
                <div className="p-5 border-b border-purple-200/50">
                  <Image 
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={140}
                    height={24}
                  />
                </div>

                {/* Navigation links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = link.route === pathname
                    const colors = colorVariants[index % colorVariants.length]

                    return (
                      <Link
                        key={link.route}
                        href={link.route}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive 
                            ? `bg-gradient-to-r ${colors} text-white shadow-lg`
                            : 'text-purple-900/90 hover:bg-white/80 hover:shadow-md'
                        }`}
                      >
                        <span className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-white/20 backdrop-blur-sm'
                            : 'bg-white/50'
                        }`}>
                          <Image 
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                            className={isActive ? 'brightness-0 invert' : ''}
                          />
                        </span>
                        <span className="font-medium">{link.label}</span>
                        {isActive && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-white/80 animate-pulse"></span>
                        )}
                      </Link>
                    )
                  })}
                </div>

                Footer with sign out
                <div className="p-4 border-t border-purple-200/50">
                  <div className="flex justify-center">
                    <UserButton 
                      afterSignOutUrl="/"
                      showName
                      appearance={{
                        elements: {
                          userButtonBox: "flex-row gap-3",
                          userButtonOuterIdentifier: "text-sm font-medium text-purple-900",
                          avatarBox: "h-8 w-8 ring-2 ring-purple-300"
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button 
            asChild 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/sign-in" className="flex items-center gap-1 px-4">
              <span className="text-sm">✨</span>
              <span className="text-sm font-semibold">Login</span>
            </Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav