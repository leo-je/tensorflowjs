const Client = {}

Client.getClient = function(clientId, clientSecret, callback){
    console.log('Client.getClient', clientId, clientSecret)
    return {clientId, clientSecret}
}

Client.grantTypeAllowed = function(a,b,c){
    console.log('Client.grantTypeAllowed', a,b,c)
}

module.exports = Client