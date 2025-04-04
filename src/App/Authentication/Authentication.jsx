import { useState } from "react"
import { Navigate } from "react-router"

function Authentication({children}) {
    const [loggedIn, setLoggedIn] = useState(()=>
         localStorage.getItem('movieStraemer user loggedin'))

    return(
        loggedIn ? children : <Navigate to='/landingPage'/>
    )
}

export default Authentication