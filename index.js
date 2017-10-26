const jayson = require('jayson');

module.exports = optsArg => {
    const opts = optsArg || { port: 7777 };
    const jaysonClient = jayson.client.http(opts);
    const rpcCall = (method, params) => new Promise((resolve, reject) => {
        let toReturn;
        jaysonClient.request(method, params, (err, res) => {
            if(err){
                reject(err);           
            }
            resolve(res.result);
        });
    })

    // defining it like this instead of just returning allows us to
    // access it from with in its own arrow functions
    const moduleExports = {
        // get the current version. Useful as a ping function too.
        version: () => rpcCall('version', []),
        // get the balances of a certain address, in satoshis.
        getaddressbalance: async (addr) => {
            const balances = await rpcCall('getaddressbalance', [addr]);
            balances.confirmed = balances.confirmed * 100000000;
            balances.unconfirmed = balances.unconfirmed * 100000000;
            return raw;
        },
        // list transactions
    };
    return moduleExports;
}