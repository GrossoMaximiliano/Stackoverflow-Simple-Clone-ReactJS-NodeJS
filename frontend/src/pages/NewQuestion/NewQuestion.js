import { useReducer, useRef, useState } from "react";
import { TagsTypes } from "../../actions/Tags";
import Modal from "../../components/Modal/Modal";
import reducerTags from "../../reducers/Tags";
import "./NewQuestion.scss";

export default function NewQuestion()
{
    const Tittle = useRef(), Description = useRef();
    const [ sucess, setSucess ]     = useState(false);
    const [ sending, setSending ]   = useState(false);

    const [ {tags}, dispatchTags ] = useReducer(reducerTags, reducerTags());
    
    const addQuestion = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if ( !token || sending) return;
        let data = {
            Tittle: Tittle.current.value, 
            Description: Description.current.value,
            Tags: tags
        }
        
        setSending(true);
        const res = await fetch("http://localhost:4000/addquestion", {
            headers:{
                'Content-Type': 'application/json',
                'authorization': `bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        if ( res.ok ) setSucess(true);
    }

    const delTag = (e) => {
        const tag = e.target.id;
        dispatchTags({ type: TagsTypes.DELTAG, tag });
    }

    const addTag = (e) => {
        e.preventDefault();
        const tag = e.target.value;
        e.target.value = "";
        return ( tag ? dispatchTags({ type: TagsTypes.ADDTAG, tag }) : false );
    }

    return (
        <>
            { sucess && <Modal hideIn={5000} tittle="Pregunta publicada!" message="Tu pregunta se ha publicado correctamente!" redirectPath="/" ></Modal> }
            <h1 >Formular una pregunta</h1>  
            <form onSubmit={addQuestion}>
                <div className="newQuestionContent">
                    <div className="camposacompletar">
                        <h2 htmlFor="tittle">Título</h2>
                        <p>Sé específico e imagina que estás haciendo la pregunta a otra persona</p>
                        <input id="tittle" ref={Tittle} type="text" placeholder="Cual es tu pregunta sobre programación? Se especifico"/>
                        <h2 htmlFor="description" >Cuerpo</h2>
                        <p>Incluye toda la información que alguien necesitaría para responder tu pregunta</p>
                        <textarea ref={Description} id="description" ></textarea>
                        <h2>Etiquetas</h2>
                        <p>Añade hasta 5 etiquetas para describir sobre qué trata tu pregunta</p>
                        <div >
                            { tags ? tags.map( (el, i) => <p className="tag" id={el} key={el+i} onClick={ delTag }>{el}</p> ) : null }
                        </div>
                        <input onKeyPress={ (e) => { ( e.nativeEvent.keyCode === 13 && addTag(e) ) }  } />
                        <hr/>
                        <button className="bluebutton">Crear pregunta</button>
                        
                    </div>
                </div>
            </form>
        </>
    )
}

