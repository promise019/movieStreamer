import { NavLink } from "react-router"

function Navbar(){
    return(
        < div className="hidden md:hidden lg:flex justify-between w-[30%]">
        <NavLink to='/homepage' className={({isActive})=> isActive ? 'activeLink' : ''}>Home</NavLink>
        <NavLink to='/discover' className={({isActive})=> isActive ? 'activeLink' : ''}>Discover</NavLink>
        <NavLink to='/release' className={({isActive})=> isActive ? 'activeLink' : ''}>Movie Release</NavLink>
        <NavLink to='/About' className={({isActive})=> isActive ? 'activeLink' : ''}>About</NavLink>
        </div>
    )
}

export default Navbar