import Navbar from '@/components/Navbar'
import GameFrame from '@/components/GameFrame'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <GameFrame />
        <ContentSection />
      </main>
      <Footer />
    </>
  )
}

