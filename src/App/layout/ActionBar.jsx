import searchButton from '../assets/icons/Search.svg'
import notifications from '../assets/icons/notification.svg'
import profile from '../assets/icons/Account.svg'

function ActionBar(){
    return(
        <div className='w-[15%] flex justify-between pr-4'>
         <img src={searchButton} alt="" className='icon'/>
         <img src={notifications} alt="" className='icon'/>
         <img src={profile} alt="" className='icon'/>
        </div>
    )
}

export default ActionBar