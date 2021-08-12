const express = require('express');
const app = express();

const cors = require('cors');
const port = 4000;

const {verifyToken} = require('../utils/Tokens');
const userController = require('../controllers/User');
const questionController = require('../controllers/Question');

app.use(cors());
app.listen(port, ()=> {
    console.log("corriendo la app en puerto " + port)
})


exports.defineRoutes = () => {
    app.use(express.json());
    /* ACCESO GLOBAL */    
    app.post("/register", userController["register"]);
    app.post("/login", userController["logIn"]);

    app.post("/addquestion", verifyToken, questionController["addQuestion"]);
    app.post("/updatequestion", verifyToken, questionController["updateQuestion"]);
    app.post("/getquestions", questionController["getQuestions"]);
    app.post("/getquestion", questionController["getQuestion"]);
    app.post("/delquestion", verifyToken, questionController["delQuestion"]);
    app.post("/addcomentary", verifyToken, questionController["addComentary"]);
    app.post("/delcomentary", verifyToken, questionController["delComentary"]);
    app.post("/addvote", verifyToken, questionController["addVote"]);
}
