import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import authService from "../services/authService";

export default function PrivateRoute( {component, ...rest})
{
    const [isLogged, setisLogged] = useState(null);


    useEffect( () => {
        const getInfo = async()=>{
            let log = await authService.isLogged();
            setisLogged(log);
        }

        getInfo();
    }, []);
    
    return( 
        ( isLogged ? <Route {...rest} component={component}></Route> : (isLogged === false ? <Redirect to='/login'/> : null)  )
    )
}