import { Route, Routes } from "react-router"
import Authentication from "./App/Authentication/Authentication"
import HomePage from "./App/pages/homepage"
import LandingPage from "./App/pages/LandingPage"
import LoginPage from "./App/pages/registration/login"
import SignUpPage from "./App/pages/registration/signup"
import SearchPage from "./App/pages/searchPage"

function App() {
    return(
    <div className="bg-black h-[100vh]">
      <Routes>
        <Route index element={<Authentication><HomePage/></Authentication>}/>
        <Route path="/landingPage" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/searchPage" element={<SearchPage/>}/>
      </Routes>
      </div>
    )
}

export default App