const crypto = require('crypto');
const connection = require('../database/connection');

const create = async (req, res) => {
    const data = req.body;

    const id = crypto.randomBytes(4).toString('HEX');
    data.id = id;
    await connection('ongs').insert(data);
    console.log(data);

    return res.json({ id });
}

const getAll = async (req, res) => {
    const ongs = await connection('ongs').select('*');
    return res.json(ongs);
}

module.exports = {
    create,
    getAll
}
