import authService from '../../services/authService';
import { timestampToText } from '../../services/timeFormat';
import './Commentary.scss';

const Commentary = ({isCreator = false, questionId, Descripcion, Timestamp = 0, AuthorName, alreadyVoted, setVoted, setVotes, Avatar="https://www.gravatar.com/avatar/c7848ad79b36846f30f0f8cc3fc256af?s=32&d=identicon&r=PG", Votes=0, Tags=[]}) => {
    const Tiempo = "Hace " + timestampToText(Timestamp);

    async function addVote(Option)
    {
        let data = {Option, questionId};
        if ( alreadyVoted )
        {
            if ( Option !== alreadyVoted ) {
                setVotes( Option === "+" ? Votes+2 : Votes-2 );
                setVoted(Option);
                await authService.FetchPost("https://simpleclonstackoverflowbackend.herokuapp.com/addvote", data );
            }
        }
        else {
            await authService.FetchPost("https://simpleclonstackoverflowbackend.herokuapp.com/addvote", data );
            setVoted(Option);
            setVotes( Option === "+" ? Votes+1 : Votes-1 );
        }
    }
    
    return (
        <>
            <article className="cajacomentarios">
                
                { isCreator ? 
                <section className="calificar">
                    <img className="icon like" src="./assets/images/like.svg" alt="" onClick={ () => {addVote("+")}}/>
                    <p>{Votes}</p>
                    <img className="icon unlike" src="./assets/images/like.svg" onClick={ () => {addVote("-")}} alt=""/>
                </section>
                : null
                }
                <section className="descripcion">
                    {Descripcion}
                </section>

                <section className="footer">
                    <section className="tags">
                        {
                            Tags.map( el => <a href={el}>{el}</a> )
                        }
                    </section>
                   
                    <article className={"author_card " + (isCreator ? "isCreator" : null) } >
                        <p>{Tiempo}</p>
                        <section className="author">
                            <img src={Avatar} alt=""/>
                            <a href="prifle">{AuthorName}</a>
                        </section>
                    </article>
                </section>
            </article>
        </>
    )
}

 export default Commentary;