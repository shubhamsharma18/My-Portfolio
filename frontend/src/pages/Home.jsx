import Hero from '../components/HeroSection'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
function Home() {
  return (
    <div className="min-h-screen bg-darker">
      <Hero/>
      <Skills/>  
      <Projects/>
         

     
    </div>
  )
}

export default Home