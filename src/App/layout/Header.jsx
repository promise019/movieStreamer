import ActionBar from "./ActionBar"
import Navbar from "./Navbar"

function Header(){
    return(
        <header className="bg-gradient-to-b from-black to-transparent flex justify-between p-2 -mt-6 -ml-3">
            <h1 className="ml-4">Ideal Movie Streamer</h1>
            <Navbar/>
            <ActionBar/>
        </header>
    )
}

export default Header