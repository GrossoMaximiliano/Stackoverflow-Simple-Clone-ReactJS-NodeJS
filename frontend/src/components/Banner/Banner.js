import { NavLink } from 'react-router-dom';
import './Banner.scss';
const Banner = () => {

    return(
        <>
            <section className="banner">
                <div className="container">
                    <article className="leftinfo">
                        <p>Stack Overflow en español es un sitio de preguntas y respuestas para programadores y profesionales de la informática. Solo te toma un minuto registrarte.</p>
                        <NavLink to="/register"><button className="bluebutton">Registrate para unirte a esta comunidad</button></NavLink>
                    </article>
                    <article className="rightinfo">
                        <div className="item mr2">
                            <img src="./assets/images/anonymousHeroQuestions.svg" alt=""/>
                            <p>Cualquiera puede formular una pregunta</p>
                        </div>
                        <div className="item ml2">
                            <img src="./assets/images/anonymousHeroAnswers.svg" alt=""/>
                            <p>Cualquiera puede responder</p>
                        </div>
                        <div className="item">
                            <img src="./assets/images/anonymousHeroUpvote.svg" alt=""/>
                            <p>Se vota a favor de las mejores respuestas, y éstas suben a los primeros puestos</p>
                        </div>
                        
                    </article>
                </div>
    </section>
        </>
    )
}

 export default Banner;