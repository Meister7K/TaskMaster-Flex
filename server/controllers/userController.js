const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    async createUser(req, res) {
        try {
            console.log(req.body)
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}