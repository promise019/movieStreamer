import { useState } from "react"
import { Navigate } from "react-router"

function Authentication({children}) {
    const [loggedIn, setLoggedIn] = useState(false)

    return(
        loggedIn ? children : <Navigate to='/landingPage'/>
    )
}

export default Authentication