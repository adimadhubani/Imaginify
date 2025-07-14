"use client"

import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
  const pathname = usePathname();

  // Color variants for different nav items
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
    <aside className="hidden h-screen w-80 bg-gradient-to-b from-indigo-50 to-purple-50 p-5 border-r border-purple-200 lg:flex flex-col shadow-lg shadow-purple-200/30">
      <div className="flex flex-col gap-8 h-full">
        {/* Logo with colorful accent */}
        <Link href="/" className="group flex items-center gap-2 py-4 px-2">
          <div className="relative">
            <Image 
              src="/assets/images/logo.svg" 
              alt="logo" 
              width={200} 
              height={32}
              className="transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </Link>

        {/* Colorful divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-between">
          <SignedIn>
            <div className="space-y-2">
              <h4 className="px-4 mb-3 text-sm font-semibold text-purple-800/80 tracking-wider">MAIN NAVIGATION</h4>
              <ul className="space-y-2">
                {navLinks.slice(0, 6).map((link, index) => {
                  const isActive = link.route === pathname
                  const colors = colorVariants[index % colorVariants.length]

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                          isActive 
                            ? `bg-gradient-to-r ${colors} text-white shadow-lg` 
                            : 'text-purple-900/90 hover:bg-white/80 hover:shadow-md'
                        }`}
                      >
                        <span className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-white/50 group-hover:bg-white/80'
                        }`}>
                          <Image 
                            src={link.icon}
                            alt={link.label}
                            width={22}
                            height={22}
                            className={isActive ? 'brightness-0 invert' : 'text-purple-900'}
                          />
                        </span>
                        <span className={`font-medium ${
                          isActive ? 'text-white' : 'group-hover:text-purple-800'
                        }`}>
                          {link.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-white/80 animate-pulse"></span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="space-y-2 mt-8">
              <h4 className="px-4 mb-3 text-sm font-semibold text-purple-800/80 tracking-wider">SETTINGS</h4>
              <ul className="space-y-2">
                {navLinks.slice(6).map((link, index) => {
                  const isActive = link.route === pathname
                  const colors = colorVariants[(index + 6) % colorVariants.length]

                  return (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                          isActive 
                            ? `bg-gradient-to-r ${colors} text-white shadow-lg` 
                            : 'text-purple-900/90 hover:bg-white/80 hover:shadow-md'
                        }`}
                      >
                        <span className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-white/50 group-hover:bg-white/80'
                        }`}>
                          <Image 
                            src={link.icon}
                            alt={link.label}
                            width={22}
                            height={22}
                            className={isActive ? 'brightness-0 invert' : 'text-purple-900'}
                          />
                        </span>
                        <span className={`font-medium ${
                          isActive ? 'text-white' : 'group-hover:text-purple-800'
                        }`}>
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}

                {/* User Button with colorful border */}
                <li className="mt-6">
                  <div className="p-0.5 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm">
                      <UserButton 
                        afterSignOutUrl='/' 
                        showName
                        appearance={{
                          elements: {
                            userButtonBox: "flex-row gap-3",
                            userButtonOuterIdentifier: "text-sm font-medium text-purple-900",
                            avatarBox: "h-9 w-9 ring-2 ring-purple-300"
                          }
                        }}
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="space-y-4">
              {/* Colorful divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
              
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/sign-in" className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <span className="font-semibold tracking-wide">Get Started</span>
                </Link>
              </Button>
            </div>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar