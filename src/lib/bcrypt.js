const bcrypt = require("bcryptjs");

const crypt = {};

crypt.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

crypt.decrypt = async (password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (err) {
        console.log(err);
    }
}

module.exports = crypt;