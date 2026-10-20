import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton'
import { PageTransition } from './PageTransition'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-grow flex flex-col pt-[72px] sm:pt-20 md:pt-24">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}
