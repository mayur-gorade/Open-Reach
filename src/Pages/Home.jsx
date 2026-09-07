import HeroSection from "../Compenent/HeroSection"
import Navbar  from '../Compenent/Navbar'
import StatsSection from '../Compenent/StatsSection'
export default function Home(){
    return(
        <>
           <Navbar/>
          <HeroSection/>
          <StatsSection/>
        </>
  
    );
}