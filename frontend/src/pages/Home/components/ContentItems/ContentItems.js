import Card from "../../../../components/Card/Card"
import './ContentItems.scss';
const ContentItems = ({Questions}) => {

    
    return(
        <>
            { (Questions.length > 0) ? Questions.map( el => <Card key={el._id} data={el}></Card>) : <h1>No se encontraron preguntas</h1> }
        </>
    )

}

export default ContentItems;