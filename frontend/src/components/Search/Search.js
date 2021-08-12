import { useRef, useState } from "react"
import { Redirect } from "react-router-dom";

export default function Search()
{
    const searchInput = useRef();
    const [ RedirectURL, setRedirectURL ] = useState(null);

    const changeVisible = (e) => {
        searchInput.current.classList.toggle("small-invisible")
    }

    const Search = (e) => {
        const text = e.target.value;
        if (text) setRedirectURL(text);
    }

    return (
        <>
            { RedirectURL != null ? <Redirect exact to={"/search/"+RedirectURL}></Redirect> : null}
            <svg onClick={changeVisible} aria-hidden="true" htmlFor="search" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 10-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 112 7a5 5 0 0110 0z"></path></svg>
            <input ref={searchInput} onKeyPress={ (e) => { ( e.nativeEvent.keyCode === 13 && Search(e) ) }  } className="small-invisible" type="text" id="search" placeholder="Buscar..."></input>
        </>
    )
}