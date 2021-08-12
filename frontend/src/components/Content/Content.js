import ContentHeader from "../ContentHeader/ContentHeader"
import './Content.scss';

const Content = ({data = {}, ContentHeaderItems, ContentItems, Tittle  = 'Explora nuestras preguntas', Questions}) =>
{

    return(
        <>
            <section className="_contenido">
                <ContentHeader Tittle={Tittle} ContentHeaderItems={ContentHeaderItems} data={data}/>
                <ContentItems data={data} Questions={Questions}/>
            </section>
        </>
    );
}


export default Content;