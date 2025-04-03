import { useEffect, useState } from "react"
import { Input } from "../../reusableComponents/input"
import Logo from "../../reusableComponents/companyLogo"
import { Buttons } from "../../reusableComponents/buttons"
import { Link, useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Spinner, SpinnerBackGround } from "../../reusableComponents/loadingComponent"
import { ErrorBar } from "../../reusableComponents/error"

async function UserData(data) {
  const response = await fetch('https://www.google.com',{
    method:'POST',
    body: JSON.stringify(data),
    headers: {'content-type' : 'application/JSON'}
  })

  return response.json
}

function LoginPage() {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const queryClient = useQueryClient()
    const {isPending, mutate, error} = useMutation({
      mutationKey: queryClient.invalidateQueries(['userdata']),
      mutationFn: UserData,
    })

    const navigate = useNavigate()

    const checkFormInput = userData.email === '' || userData.password.length < 8

    function handleSubmit(e) {
      e.preventDefault();
      
          setUserData({
            email:'',
            password:''
          })

          console.log(`email:${userData.email} password: ${userData.password}`)
          mutate({userEmail: userData.email, userpassword: userData.password})

    }

    return(
        <div className="darkmode">

        <ErrorBar >
          {error ? error.message : ''}
        </ErrorBar>
        
        <Buttons onClick={()=> navigate('/landingPage')} className='return'>
          back
        </Buttons>

          <Logo className='registrationLogo'/>

           {isPending && 
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