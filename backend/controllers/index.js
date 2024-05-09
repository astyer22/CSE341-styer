const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
    try {
        const db = await mongodb.getDb();
        const result = await db.collection('user').find().toArray();
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = { getData };