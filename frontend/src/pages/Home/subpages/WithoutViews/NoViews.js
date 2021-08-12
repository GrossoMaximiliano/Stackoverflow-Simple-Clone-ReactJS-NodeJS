import { useEffect, useState } from 'react';
import Banner from '../../../../components/Banner/Banner';
import Content from '../../../../components/Content/Content';
import PopularQuestions from '../../../../components/PopularQuestions/PopularQuestions';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import ContentHeaderItems from '../../components/ContentHeaderItems/ContentHeaderItems';
import ContentItems from '../../components/ContentItems/ContentItems';
import {getQuestions} from "../../../../services/getQuestions";
const NoViews = ( ) => {

    const [questions, setQuestions] = useState([]);
    

    useEffect( () => {
        const callFetch = async () => {
            let data = await getQuestions();
            data = await data.filter( el => el.Views === 0 );
            if ( data ) setQuestions(data.reverse());
        }
        
        callFetch();
    }, [])

    

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

export default NoViews;