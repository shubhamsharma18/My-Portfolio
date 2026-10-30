import Hero from '../components/HeroSection'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
function Home() {
  return (
    <div className="min-h-screen bg-darker">
      <Hero/>
      <Skills/>  
      <Projects/>
         <Experience/>

     
    </div>
  )
}

export default Home