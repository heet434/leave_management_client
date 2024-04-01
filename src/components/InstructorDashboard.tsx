import {useEffect} from 'react'
import { useNavigate} from 'react-router-dom';

function Instructor({userLoginUtility}: {userLoginUtility: any}) {
    const navigate = useNavigate();
    useEffect(() => {
        if(!userLoginUtility.getUserStatus()){
            alert("User is not logged in, please sign in to continue.");
            navigate('/');
        }
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default Instructor
