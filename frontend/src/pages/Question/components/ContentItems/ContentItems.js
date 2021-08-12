import { useEffect, useState } from 'react';
import Commentary from '../../../../components/Commentary/Commentary';
import NewComment from '../../../../components/newComment/NewComment';
import authService from '../../../../services/authService';
import './ContentItems.scss';

const ContentItems = ({ data }) => {

    const [ replies, setReplies ] = useState([]);
    const [ votes, setVotes ] = useState(0);
    const [ voted, setVoted ] = useState(null);
    const {_id, Description, Tags, Replies, Timestamp, Votes, AuthorName} = data;
    
    
    useEffect( () => {
        const loadVotes = async () => {
            const userId = await authService.getUserId();
        
            let i = 0;
            Votes.forEach( ({authorId, Option}) => {
                Option === "+" ? i += 1 : i -= 1 ;
                if ( authorId === userId ) setVoted(Option);
            });
            setVotes(i);
            setReplies(Replies);
        }
        loadVotes();

    }, [data, Replies, Votes]);
 

    return(
        <>
        
            <Commentary Descripcion = {Description} Timestamp={Timestamp} alreadyVoted={voted} setVoted={setVoted} Votes={votes} setVotes={setVotes} isCreator={true} AuthorName={AuthorName} tags={Tags} questionId={_id} />
            {
                replies.length && <>
                    <h3>{replies.length} {replies.length === 1 ? " respuesta" : " respuestas"}</h3>
                    {replies.map((el,i) => <Commentary key={el.Content+i} Descripcion ={el.Content} Timestamp={el.Timestamp} AuthorName={el.Author}/>)}
                </>
            }

           <NewComment id={_id} Replies={Replies} setReplies={setReplies} ></NewComment> 
        </>
    )

}

export default ContentItems;