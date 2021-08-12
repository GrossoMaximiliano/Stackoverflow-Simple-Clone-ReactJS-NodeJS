import { useRef } from "react";
import { Redirect } from "react-router-dom";
import authService from "../../services/authService";

import './NewComment.scss';

export default function NewComment({id, Replies, setReplies })
{
    const Commentary = useRef();
    let RedirectURL = null;

    const addComment= async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if ( !token ) return RedirectURL = "/login";
        let fetchBody = {
            Content: Commentary.current.value, 
            questionId: id
        }
        const {res} = await authService.FetchPost("http://localhost:4000/addcomentary", fetchBody);

        setReplies( replies => ([...replies, res]));
    }

    return (
        <>
            <form onSubmit={addComment} className="addComent">
                <h1>Tu Respuesta</h1>
                <h2>¿Conoces a alguien que pueda responder? Comparte el enlace a esta pregunta.</h2>
                <textarea ref={Commentary} id="comment"></textarea>
                <button className="bluebutton">Publica tu respuesta</button>

                { RedirectURL != null && <Redirect to={RedirectURL} /> }
            </form>
        </>
    )
}
