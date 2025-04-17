import { useState } from "react"
import { Buttons } from "../reusableComponents/buttons"
import { useNavigate } from "react-router"
import karateKid from '../assets/images/karateKid.jpg'
import fatherHood from '../assets/images/fatherHood.jpg'
import mazeRunner from '../assets/images/mazeRunner.jpg'
import outpost from '../assets/images/theOutpost.jpg'
import everything from '../assets/images/everythingEverything.jpg'

const slides = [
    {name: 'karate kid', src:karateKid},
    {name: 'Father Hood', src:fatherHood},
    {name: 'Maze Runner', src:mazeRunner},
    {name: 'The outpost', src:outpost},
    {name: 'Everything Everything', src:everything}
]

function LandingPage() {
    const [slide, setSlide] = useState(1)
    const Navigate = useNavigate()

    return(
        <div className="transparent">
            <h1 className="landscape: text-center mt-[10%] text-2xl font-bold md:text-4xl md:mt-[5%]
             xl:text-2xl xl:mt-[3%]">
                ideal Movie Streamer
            </h1>

            <div className=" h-[50%] w-[98vw] mt-[12vh] ml-0 portait:w-[10%]
             md:w-[75vw] md:ml-[13%] md:mt-[5vh]
             xl:w-[34vw] xl:ml-[32%]">
             
             <img className="h-[100%] w-[99%] rounded-2xl"
              src={slides[slide].src}
              alt={slides[slide].name}
             />

             <div className="flex justify-between w-[98%] font-bold mt-2 p-2">

             <Buttons onClick={()=> setSlide(current=> current < 1 ? 0 : current - 1)}>
                    {slide === 0 ? '' : 'Previous'}
             </Buttons>

             <Buttons onClick={()=> setSlide(current=> current > 3 ? 4 : current + 1)}>
                    {slide === 4 ? '' : 'Next'}
             </Buttons>
             </div>
             
             <div className="flex justify-between p-2 mt-3">

             <Buttons onClick={()=> Navigate('/signup')}
              className='bg-red-400 rounded-[10px] w-[30%] p-2 text-white
                sm:bg-red-400 md:bg-red-400'>
                SignUp
             </Buttons>

             {' '}

             <Buttons onClick={()=> Navigate('/login')}
              className='bg-green-400 rounded-[10px] w-[30%] p-2 text-white
                sm:bg-green-400 md:bg-green-400'>
                Login
             </Buttons>

             </div>
            </div>
        </div>
    )
}

export default LandingPage