const users = []

//Join user to chat
function userjoin(id, username, room){
    const user = {id, username, room};

    users.push(user)

    return user;
}

//Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//User leaves the chat
function userLeaves(id){
    const index = users.findIndex(user => user.id === id);

    if (index!==-1){
        return users.splice(index, 1)[0];
    }
}

//Get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room );
}

module.exports = {
    userjoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers
}