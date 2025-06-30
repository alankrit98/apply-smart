const { client } = require('../db');

const getApplicationCollection = () => client.db('userdetail').collection('applications');

module.exports = { getApplicationCollection };
