const jwt = require('jwt-simple');
const moment = require('moment');

const key = "WebProyect4_";

const generateToken = (authorID) =>
{
    const payload = {
        id: authorID,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, key);
}


const decodeToken = (token) => {
    try {
        const payload = jwt.decode(token, key);
        return payload;
    }
    catch(e) 
    {
		return;
	}

}

const verifyToken = async (req, res, next) =>
{
    try {
        if (!req.headers.authorization){
            return res.status(401).send("Usted no tiene permiso a acceder a esta ruta!")
        }
        let token = req.headers.authorization.split(' ')[1];
        if ( !token ) return res.status(401).send("Usted no tiene permiso a acceder a esta ruta!");

        let decode = await decodeToken(token);
        if ( !decode ) return res.status(401).send("Usted no tiene permiso a acceder a esta ruta!");

        req.userId = decode;
        next();

    } catch(e) {
		return res.status(401).send("Usted no tiene permiso a acceder a esta ruta!");
	}
}


exports.generateToken = generateToken;
exports.decodeToken = decodeToken;
exports.verifyToken = verifyToken;