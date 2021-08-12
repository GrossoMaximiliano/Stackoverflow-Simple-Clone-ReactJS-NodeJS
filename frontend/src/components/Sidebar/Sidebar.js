import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {

    return(
        <>
            <nav className="sidebar md-novisible" id="sidebar"> 
                <ul> 
                    <NavLink exact to='/' activeClassName='active' className='clearDecoration'> <li>Home</li></NavLink>
                    <li className="sidebar__subtitle">PÚBLICO</li>
                    <li>
                        <ul>
                            <NavLink to='/question' activeClassName='active' className='clearDecoration' > <li>Preguntas</li></NavLink>
                            <NavLink to='/withoutviews' activeClassName='active' className='clearDecoration' > <li>Sin vistas</li></NavLink>
                            <NavLink to='/questionnoreply' activeClassName='active' className='clearDecoration' > <li>Sin respuestas</li></NavLink>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;