const bcrypt = require('bcryptjs');

module.exports = {
    register: async function(req, res) {
        const {firstName, lastName, password, username} = req.body;
        //get the dbInstance
        const db = req.app.get('db');
        //check if the username is already taken
        const response = await db.checkForUser(username);
        if(+response[0].count > 0) {
            res.status(406).json({
                error: "USERNAME_TAKEN"
            })
        } else {
            //hash it up
            console.log(password);
            const hash = await bcrypt.hash(password, 10)
            //write sql statement to put user in database
            await db.addUser(firstName, lastName, hash, username)
            //put the user on the session
            req.session.user = {
                name: firstName + ' ' + lastName,
                username,
                balance: 0
            }
            //send back response
            res.status(200).json(req.session.user);
        }
    },

    login: async function(req, res) {
        //get the db instance
        const db = req.app.get('db');
        //destructure req.body
        const {username, password} = req.body;
        //get the hash for the supplied user
        const info = await db.getUsersInfo(username)
        //compare the sent password and the retrieved hash
        console.log(info)
        const isCorrect = await bcrypt.compare(password, info[0].password);
        //send back a response
        if(isCorrect === true) {
            req.session.user = {
                username,
                balance: info[0].balance,
                name: info[0].first_name + ' ' + info[0].last_name
            }
            res.status(200).json(req.session.user);
        } else {
            res.status(401).json({
                error: "INCORRECT_USERNAME_OR_PASSWORD"
            })
        }
    }
}