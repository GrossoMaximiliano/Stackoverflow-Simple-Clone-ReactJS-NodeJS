const bcrypt = require("bcrypt");

const Encript = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

const ComparePassword = async (password, encriptedPassword) => {
    return bcrypt.compare(password, encriptedPassword);
}

exports.Encript = Encript;
exports.ComparePassword = ComparePassword;