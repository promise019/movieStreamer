import { Route, Routes } from "react-router"
import Authentication from "./App/Authentication/Authentication"
import HomePage from "./App/pages/homepage"
import LandingPage from "./App/pages/LandingPage"
import LoginPage from "./App/pages/registration/login"
import SignUpPage from "./App/pages/registration/signup"

function App() {
    return(
      <Routes>
        <Route index element={<Authentication><HomePage/></Authentication>}/>
        <Route path="/landingPage" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
      </Routes>
    )
}

export default App