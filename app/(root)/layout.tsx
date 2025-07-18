import MobileNav from "@/components/shared/MoblieNav"
import Sidebar from "@/components/shared/Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      {/* Sidebar - shown on lg screens and up, hidden on smaller screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* MobileNav - shown on screens smaller than lg, hidden on lg and up */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout