import Hero from "@/components/sections/hero"
import Projects from "@/components/sections/projects"
import Services from "@/components/sections/services"
import Contact from "@/components/sections/contact"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import Display from "@/components/sections/display"
import PortfolioPage from "@/components/sections/PortfolioPage"
import PortfolioShowcasePage from "@/components/sections/VideoDisplay"
import { OurProcess } from "@/components/sections/our-process"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioShowcasePage />
        <Display />
        <OurProcess />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
