const UserModel = require('../models/User');
const { Encript, ComparePassword } = require('../utils/Encript');
const { generateToken, decodeToken} = require('../utils/Tokens');

exports.register = async ( req, res ) => {

    let { Name, Email, Password  } = await req.body;

    let alreadyRegistered = await userExist(Email, Name);
    if ( alreadyRegistered == true ) return res.status(401).send({err:"Ese email o nickname ya esta siendo utilizado."})

    Password = await Encript(Password);

    let user = await UserModel({ Name, Email, Password});
    await user.save();
    let token = await generateToken(user._id);
    return res.status(201).send( { err:null, token} ) 
};
 
exports.logIn = async ( req, res ) => {
    const { Email, Password } = req.body;
    let user = await UserModel.findOne( { Email } );
    if( !user ) return res.status(400).send({err:"Email no encontrado."});
    
    let isMatch = await ComparePassword(Password, user.Password);
    let token = await generateToken(user._id);
    isMatch ? res.status(201).send( {err: null, token} ) : res.status(401).send({err:"Contraseña incorrecta!"})

}; 


 
async function userExist(Email, Name)
{
    let user = await UserModel.findOne( { Email } ) || await UserModel.findOne( { Name } );
    return ( !user ? false : true );
}