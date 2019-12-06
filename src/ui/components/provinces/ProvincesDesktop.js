import React, {useContext} from 'react'
import UserContext from '../../../context/hooks/UserContext';


function ProvincesDesktop() {

    const province = useContext(UserContext);


    return (
        <div className="provinces-desktop">
            {province}
        </div>
    )
}

export default ProvincesDesktop
