import { useEffect, useState } from 'react';
import { timestampToText } from '../../../../services/timeFormat';
import './ContentHeaderItems.scss'

const ContentHeaderItems = ({data}) => {
    const [ views, setViews] = useState(0);
    const [ date, setDate ] = useState("...");
    const {Views, Timestamp } = data;
    useEffect( () => {
        let time = timestampToText(Timestamp);
        setViews(Views);
        setDate(time);
    }, [data, Views, Timestamp])
    return(
        <>
            <article className="info">
                <p>Formulada hace {date}</p>
                <p>Visto {views} veces</p>
            </article>
        </>
    )
}

export default ContentHeaderItems;