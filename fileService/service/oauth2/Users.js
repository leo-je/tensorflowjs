const Users = {}

Users.getUser = function (email, password, cb) {
    console.log('Users.getUser', email, password,)
    cb({ name: 'text', password: '1234', email })
}

module.exports = Users