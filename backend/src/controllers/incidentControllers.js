const crypto = require('crypto');
const connection = require('../database/connection');

const create = async (req, res) => {
    const data = req.body;

    data.ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert(data);

    return res.json({ id });
}

const getAll = async (req, res) => {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count()
    console.log(count);

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page-1)*5)
    .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ]);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(incidents)
}

const deleteOne = async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

    if (incident.ong_id !== ong_id) {
        return res.status(401).json({ error: "Operation not permitted" });
    } else {
        await connection('incidents')
            .where('id', id)
            .delete();

        return res.status(204).send();
    }
}

module.exports = {
    create,
    getAll,
    deleteOne
}
