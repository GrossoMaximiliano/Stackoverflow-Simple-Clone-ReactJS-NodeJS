import './ContentHeader.scss';
import { Link } from 'react-router-dom';

const ContentHeader = ( { Tittle, ContentHeaderItems, data }) =>
{

    return( 
        <>
            <section className="cabezera">
                <section className="titulo">
                    <h2>{Tittle}</h2>
                   <Link to='/question/add'> <button className="bluebutton" >Formular una pregunta</button> </Link>
                </section>

               <ContentHeaderItems data={data}></ContentHeaderItems> 
            </section>
        </>
    );
}


export default ContentHeader;