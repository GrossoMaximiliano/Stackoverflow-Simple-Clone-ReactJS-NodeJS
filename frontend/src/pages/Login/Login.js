import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import authService from '../../services/authService';
import Modal from "../../components/Modal/Modal";

import './Login.scss';
 
const Login = () => {

    const Name = useRef(), Password = useRef();

    const [isLogged, setisLogged]   = useState(false);
    const [success, setSuccess ]    = useState(false);
    const [ isSending, setSending ] = useState(false);
    const [ err, setErr ] = useState(false);

    useEffect( () => {
        const getInfo = async()=>{
            let log = await authService.isLogged();
            setisLogged(log);
            
        }

        getInfo();
    }, [])

    const submitLogin = async (e) => {
        e.preventDefault();
        setErr(null);
        if ( isSending ) return;
        setSending(true);
        let res = await authService.LogInAccount(Name.current.value, Password.current.value);
        res === true ? setSuccess(true) : setErr(res);
        setSending(false);
    }

    return(
        <>
            {
                success ? <Modal hideIn={5000} tittle="¡Sesion iniciada!" message="¡Has iniciado sesión correctamente!" redirectPath="/" /> : null
            }

            { 
            isLogged ? <Redirect to="/" /> : 
            <>
                <form className="loginContent" onSubmit={submitLogin} >
                    <img src="./assets/images/logo.png" alt="logo"/>
                    <div className="card">
                        <label htmlFor="name">Correo electrónico</label> 
                        <input ref={Name} id="name" type="text"/>
                        <label htmlFor="password" >Contraseña</label>
                        <input ref={Password} id="password" type="password"/>
                        { err && <span>{err}</span> }

                        <button className="bluebutton">Iniciar sesión</button>
                    </div>

                </form>
            </> 
            }
        </>
    )
}

export default Login;