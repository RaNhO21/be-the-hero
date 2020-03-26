const connection = require('../database/connection');

const createSession = async (req, res) => {
    const id = req.body.id;
    const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

    if (!ong) {
        return res.status(400).send({ error: "No ONG with this ID !!!" });
    } else {
        return res.json(ong);
    }

}

module.exports = {
    createSession
}
