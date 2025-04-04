import { useState } from "react"
import { Input } from "../../reusableComponents/input"
import Logo from "../../reusableComponents/companyLogo"
import { Buttons } from "../../reusableComponents/buttons"
import { Link, useNavigate } from "react-router"
import { Spinner, SpinnerBackGround } from "../../reusableComponents/loadingComponent"
import { ErrorBar } from "../../reusableComponents/error"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqEtd6bGVUU-JFRp33s4_XQq92Qznt9ng",
  authDomain: "moviestreamer-9f918.firebaseapp.com",
  projectId: "moviestreamer-9f918",
  storageBucket: "moviestreamer-9f918.firebasestorage.app",
  messagingSenderId: "208583991212",
  appId: "1:208583991212:web:5d1a0a98cf637d2120e409",
  measurementId: "G-D0Z31LBZ6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


function LoginPage() {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const [firebaseError, setFirebaseError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const checkFormInput = userData.email === '' || userData.password.length < 8

    async function handleSubmit(e) {
      e.preventDefault();
      
          setUserData({
            email:'',
            password:''
          })

          setIsLoading(true)

         await signInWithEmailAndPassword(auth, userData.email, userData.password)
                .then(userCredential=>{
                  const user = userCredential.user

                  localStorage.setItem('movieStraemer user loggedin', JSON.stringify(user))
                  console.log(user)
                  setTimeout(()=>{
                    navigate('/homepage')
                  }, 3000)
                  
                })
                .catch(error=>{
                  const errorCode = error.code
                  const errorMessage = error.message

                  setIsLoading(false)

                  setFirebaseError(errorMessage)
                  console.log(`error code: ${errorCode}, error message: ${errorMessage}`)
                })

          console.log(`email:${userData.email} password: ${userData.password}`)

    }

    return(
        <div className="darkmode">

          <ErrorBar className={firebaseError.length > 1 ? 'errorCreatingAccount' : 'successfullCreated'}>
            {firebaseError.length > 1 ? 'wrong email or password' : 'successful'}
          </ErrorBar>
        
          <Buttons onClick={()=> navigate('/landingPage')} className='return'>
            back
          </Buttons>

          <Logo className='registrationLogo'/>

           {isLoading && 
            <SpinnerBackGround className='spinner-background'>
              <Spinner />
            </SpinnerBackGround> 
           }

            <form className='form'>

              <label htmlFor="Email">Email</label>
              <br />
              <Input value={userData.email} className='inputField' onChange={(e)=>
                setUserData({...userData, email: e.target.value})} type='email'
              />
              
              <br />

              <label htmlFor="password">Password</label>
              <br />
              <Input value={userData.password} className='inputField' onChange={(e)=>
                setUserData({...userData, password: e.target.value})} type='password'
              />

              <br />

             {' '}

              <br />
             <Buttons className={checkFormInput ? 'notChecked' : 'checked'}
              disabled={checkFormInput} onClick={(e)=> handleSubmit(e)}>
                continue
             </Buttons>
             <br />
             <br />

            <h2 className="text-center">already have an account? <b><Link to='/signup'>signup</Link></b> </h2>
            </form>

            
        </div>
    )
}

export default LoginPage