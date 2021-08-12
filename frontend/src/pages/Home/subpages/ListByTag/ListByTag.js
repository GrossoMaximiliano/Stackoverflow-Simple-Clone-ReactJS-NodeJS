import { useEffect, useState } from 'react';
import Banner from '../../../../components/Banner/Banner';
import Content from '../../../../components/Content/Content';
import PopularQuestions from '../../../../components/PopularQuestions/PopularQuestions';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import ContentHeaderItems from '../../components/ContentHeaderItems/ContentHeaderItems';
import ContentItems from '../../components/ContentItems/ContentItems';
import {getQuestions} from "../../../../services/getQuestions";
import { useParams } from 'react-router-dom';
const ListByTag = ( ) => {

    const [questions, setQuestions] = useState([]);
    const { tag } = useParams();
    useEffect( () => {
        const callFetch = async () => {
            let data = await getQuestions();
            if ( tag ) {
                data = data.filter( (el) => el.Tags.find( el => el.toLowerCase() === tag.toLowerCase() ) );
            }
            if ( data ) setQuestions(data.reverse());
        }
        
        callFetch();
    }, [tag])

    return (
        <>
            <Banner/>
            <section className="contenido">
                <Sidebar/>
                <Content ContentHeaderItems={ContentHeaderItems} ContentItems={ContentItems} Questions={questions}/>
                <PopularQuestions/>
            </section>
        </>
    )   
}

export default ListByTag;