import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from '../Search/Search';
import './Navbar.scss';


const Navbar = () => {
    const phoneNav = useRef();

    const togglePhoneNav = () => {
        phoneNav.current.classList.toggle("navClosed")
    }

    const CloseMenu = () => {
        phoneNav.current.classList.add("navClosed")
    }

    return(
        <>
        <nav className="nav">
            <div className="logo">
            <Link to='/' replace > <img src="./assets/images/logo.png" alt="logo"/> </Link>
            </div>

            
                <div className="input">
                    <Search/>
                </div>

            <div className="buttons only-large">
                <Link to="/login" style={{ textDecoration: 'none' }} ><button className="bluebutton loginbutton">Iniciar sesión</button></Link>
                <Link to="/register" style={{ textDecoration: 'none' }} ><button className="bluebutton">Registrarse</button></Link>
            </div>

            <svg onClick={togglePhoneNav} className="only-medium-or-small" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>
        </nav>

       <nav ref={ phoneNav } className="only-medium-or-small phoneNav navClosed" onClick={CloseMenu}>
           <NavLink exact to='/' activeClassName='active' > <button >Home</button> </NavLink>
           <NavLink exact to='/withoutviews' activeClassName='active' > <button >Preguntas sin vistas</button> </NavLink>
           <NavLink exact to='/questionnoreply' activeClassName='active' > <button>Preguntas sin respuestas</button> </NavLink>
           <NavLink exact to='/login' activeClassName='active' > <button>Iniciar sesion</button> </NavLink>
           <NavLink exact to='/register' activeClassName='active' > <button>Registrarse</button> </NavLink>
        </nav> 
        
        <div style={{height: "46px"}}></div>
        </>
    )
}

export default Navbar;