import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { timestampToText } from '../../services/timeFormat';
import './Card.scss';

const Card = ({data}) => {
    const [votes, setVotes ] = useState(0);
    const {_id, Tittle, Description, Tags, Replies, Votes, Views, Timestamp} = data;
    const Time = timestampToText(Timestamp); 
    useEffect( () => {
        let i = 0;
        Votes.forEach( ({Option}) => {
            Option === "+" ? i += 1 : i -= 1 ;
        });
        setVotes(i)

    }, [data, Votes]);

    return(
        <>
            <article className="pregunta">
                <div className="estadistica">
                    <div className="estadistica_item">
                        <p>{votes}</p>
                        <p>votos</p>
                    </div>
                    <div className="estadistica_item">
                        <p>{Replies.length}</p>
                        <p>respuestas</p>
                    </div>
                    <div className="estadistica_item">
                        <p>{Views} vista/s</p>
                    </div>
                </div>
                <div className="informacion"> 
                    <Link to={`question/${_id}`} key={_id}>{Tittle}</Link>
                    <p>{ ( Description ? Description.slice(0,400) + "..." : "Cargando..." ) }</p>
                    <div className="foot">
                        <article className="tags">
                            { Tags ? Tags.map(el => <Link to={`/tag/${el}`}  key={el+_id}>{el}</Link> ) : null  }
                        </article>
                        <p>Formuló esta pregunta hace {Time}</p>
                    </div>
                </div>
            </article>
        </>
    )

}

export default Card;