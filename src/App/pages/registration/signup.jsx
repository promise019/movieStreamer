import { useEffect, useState } from "react"
import { Input } from "../../reusableComponents/input"
import Logo from "../../reusableComponents/companyLogo"
import { Buttons } from "../../reusableComponents/buttons"
import { Link, useNavigate } from "react-router"
import { emailValidator, nameValidation, passwordValidator } from "../../features/formValidation"
import { Spinner, SpinnerBackGround } from "../../reusableComponents/loadingComponent"
import { ErrorBar } from "../../reusableComponents/error"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

function SignUpPage() {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const navigate = useNavigate()

    //using regex to check for valid inputs
    const [nameError, setNameError] = useState([])
    const [emailError, setEmailError] = useState([])
    const [passwordError, setPasswordError] = useState([])
    const nameResult = nameValidation(userData.name)
    const emailResult = emailValidator(userData.email)
    const passwordResult = passwordValidator(userData.password)

    //policy checkbox
    const [isChecked, setIsChecked] = useState(false)

    const [firebaseError, setFirebaseError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      setIsChecked(isChecked)
      setEmailError([])
      setPasswordError([])
      setNameError([])
    },[])


    const validator = userData.name===''||
          !userData.email.endsWith('@gmail.com' || '@yahoomail.com') || userData.email.length < 3 ||
          !userData.password.match(/[A-Z]/) || !userData.password.match(/[a-z]/) || !userData.password.match(/[0-9]/) ||
          userData.password.length < 8


    async function handleSubmit(e) {
      e.preventDefault();

      switch (validator) {
        case true:
          return setEmailError(emailResult), 
                 setPasswordError(passwordResult), 
                 setNameError(nameResult)
          break;
      
        case false:
          setUserData({
            name: '',
            email:'',
            password:''
          })

          setIsLoading(true)

         await createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then(userCredential=>{
                  const user = userCredential.user
                  console.log(user)
                  setTimeout(()=>{
                    navigate('/login')
                  }, 3000)
                  
                })
                .catch(error=>{
                  const errorCode = error.code
                  const errorMessage = error.message

                  setIsLoading(false)

                  setFirebaseError(errorMessage)
                  console.log(`error code: ${errorCode}, error message: ${errorMessage}`)
                })

          console.log(`name: ${userData.name}, email:${userData.email} password: ${userData.password}`)
          break;
      }

    }

    return(
      <div className="darkmode">

        <ErrorBar className={firebaseError.length > 1 ? 'errorCreatingAccount' : 'successfullCreated'}>
          {firebaseError.length > 1 ? firebaseError : 'account successfully created'}
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
                
              <label htmlFor="Username">Username</label>
              <br />
              <Input value={userData.name} className='inputField' onChange={(e)=>
                setUserData({...userData, name: e.target.value})} type='text' 
              />
              <p className={nameError.length > 0 ? 'form-error' : ''}>{nameError}</p>


              <label htmlFor="Email">Email</label>
              <br />
              <Input value={userData.email} className='inputField' onChange={(e)=>
                setUserData({...userData, email: e.target.value})} type='email'
              />
              <p className={emailError.length > 0 ? 'form-error' : ''}>{emailError}</p>


              <label htmlFor="password">Password</label>
              <br />
              <Input value={userData.password} className='inputField' onChange={(e)=>
                setUserData({...userData, password: e.target.value})} type='password'
              />
              <p className={passwordError.length > 0 ? 'form-error' : ''}>{passwordError}</p>


              <Input checked={isChecked} className='rounded-[50px]' onChange={()=>
                setIsChecked(!isChecked)} type='checkbox'
              />

              {' '}

              <span> i agree to the <em>privacy policy</em> and <b>terms and conditions</b> </span>
                <br />
                <br />
              <Buttons className={isChecked? 'checked' : 'notChecked'} disabled={!isChecked} onClick={(e)=> handleSubmit(e)}>
                continue
              </Buttons>
                <br />
                <br />

              <h2 className="text-center">dont have an account? <b><Link to='/login'>login</Link></b> </h2>

            </form>

      </div>
    )
}

export default SignUpPage