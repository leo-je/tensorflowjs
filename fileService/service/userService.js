
const userService = {}

userService.getUserByUsername = (username) => {
    return { username: "admin", password: "43215678" }
}

module.exports = userService