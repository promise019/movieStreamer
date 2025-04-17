import searchButton from '../assets/icons/Search.svg'
import notifications from '../assets/icons/notification.svg'
import profile from '../assets/icons/Account.svg'
import { useNavigate } from 'react-router'

function ActionBar({className}){
    const navigate = useNavigate()
    return(
        <div className={className}>
         <img onClick={()=>navigate('/searchPage')} src={searchButton} alt="" className='icon'/>
         <img src={notifications} alt="" className='icon'/>
         <img src={profile} alt="" className='icon'/>
        </div>
    )
}

export default ActionBar