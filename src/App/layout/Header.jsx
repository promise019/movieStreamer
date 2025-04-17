import ActionBar from "./ActionBar"
import Navbar from "./Navbar"

function Header(){
    return(
        <header className="w-[101vw] bg-gradient-to-b from-black to-transparent flex justify-between pt-3 pl-2 pr-3 -mt-10 -ml-1
            z-10 fixed">
            <h1 className="ml-2">Ideal Movie Streamer</h1>
            <Navbar/>
            <ActionBar className='w-[20%] flex justify-between pr-1'/>
        </header>
    )
}

export default Header