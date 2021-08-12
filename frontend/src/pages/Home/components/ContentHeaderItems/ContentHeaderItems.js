import { NavLink } from 'react-router-dom';
import './ContentHeaderItems.scss'

const ContentHeaderItems = () => {
    return(
        <>
            <section className="filtros">
                <article className="tags">
                        <a href="https://github.com/GrossoMaximiliano/" rel="noopener noreferrer" target="_blank">https://github.com/GrossoMaximiliano/</a>
                </article>
                <article className="categoria">
                    <NavLink exact to="/popular" className="Navlink" activeClassName="categoryActive"><button className="button">Popular</button></NavLink>
                    <NavLink exact to="/mostvoted" className="Navlink" activeClassName="categoryActive"><button className="button">Mas votado</button></NavLink>
                    <NavLink exact to="/olds" className="Navlink" activeClassName="categoryActive"><button className="button">Mas viejo</button></NavLink>
                </article>
            </section>
        </>
    )
}

export default ContentHeaderItems;