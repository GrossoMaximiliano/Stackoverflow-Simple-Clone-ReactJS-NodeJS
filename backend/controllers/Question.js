const QuestionModel = require('../models/Questions');
const UserModel = require('../models/User');

exports.addQuestion = async (req, res) => {
    const { Tittle, Description, Tags } = req.body;
    const Author = req.userId["id"], Timestamp = Math.floor( Date.now() / 1000);

    const question = QuestionModel({Tittle, Description, Tags, Author, Timestamp});
    question.save();

    res.status(201).send("Pregunta agregada correctamente!");

} 

exports.delQuestion = async (req, res) => {
    const { _id } = req.body;
    const question = await QuestionModel.findById(_id);
    if (!question) return res.status(401).send("Esa pregunta ya ha sido eliminada.");
    else if ( question["Author"]["id"] === req.userId["id"] ) {
        await QuestionModel.findOneAndRemove({ _id }, (err, data) => {
            if (err) return res.status(401).send(err);
            else return res.status(201).send("Pregunta eliminada!");
        } );
    }
    else return res.status(401).send("Usted no es dueño de esta pregunta.");
}

exports.getQuestion = async (req,res) => {
    const {_id} = req.body;
    const question = await QuestionModel.findById(_id);
    if ( !question ) return res.status(401).send("Pregunta no encontrada!")
    question.Views += 1; 
    await question.save();
    const {Name} = await UserModel.findById(question.Author);
    
    res.send({ ...question["_doc"], ...{ AuthorName:Name }}); 
}; 

exports.getQuestions = async (req,res) => {
    var questions = await QuestionModel.find();
    res.status(201).send(questions); 
}; 


exports.updateQuestion = async (req, res) => {
    const { _id, Tittle, Description, Tags } = req.body;
    const question = await QuestionModel.findById(_id);
    if (!question) return res.status(401).send("Esa pregunta no exista");
    else if ( question["Author"]["id"] === req.userId["id"] ) 
    {
        await QuestionModel.findOneAndUpdate({ _id }, { Tittle, Description, Tags }, (err,data) => {
            if (err) return res.status(401).send(err);
            else return res.status(201).send("Pregunta actualizada!");
        } );
    }
    else return res.status(401).send("Usted no es dueño de esta pregunta.");
}

exports.addComentary = async (req, res) => {
    const { Content, questionId } = req.body;
    const question = await QuestionModel.findById(questionId);
    const Timestamp = Math.floor( Date.now() / 1000);

    if(!question) return res.status(401).send({err: "Pregunta no encontrada."});
    let user = await UserModel.findById( req.userId["id"] );
    question["Replies"].push({
        Author: user["Name"], 
        Content,
        Timestamp
    });
    await question.save();
    res.status(201).send({err:null, res: { Author: user["Name"], Content, Timestamp }} );
}

exports.delComentary = async (req, res) => {
    const { index, questionId } = req.body;
    const question = await QuestionModel.findById( questionId );
    if ( !question || question["Replies"].length == 0 ) return res.status(401).send({ err:"Usted no es dueño de este comentario." });
    else if ( question["Replies"][index]["Author"] === req.userId["id"] ) {
        question["Replies"].splice(index, 1);
        question.save();
        res.status(401).send({ err:"Usted no es dueño de este comentario." });
    }
    else return res.status(401).send();
    
}

exports.addVote = async (req, res) => {
    const authorId = req.userId["id"];
    const { Option, questionId } = req.body;
    const question = await QuestionModel.findById( questionId );
    let {Votes} = question;

    if( !question ) return res.status(401).send({err:"Pregunta no encontrada"});

    let found = Votes.find( (vote) => {
        return ( vote.authorId === authorId );
    })

    if ( !found )
    {
        await question.Votes.push({ authorId, Option});
        await question.save();
        res.status(201).send( { err:null, msg:"Voto guardado."} );
    }
    else 
    {
        for(let i = 0; i < Votes.length; i++ ){
            if ( Votes[i].authorId === authorId ) 
            {
                Votes[i].Option = Option;
            }
        }

        question.Votes = Votes;
        question.save();
        
        await QuestionModel.findOneAndUpdate({_id:questionId}, {Votes} );
        res.status(201).send({err:null, msg:"Voto actualizado."});
    }
    // 
    
}


