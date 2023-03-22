const connection = require('../connection/connection');

const queryExecute = async(query) => {

    return new Promise((resolve, reject) => {
        try {
            connection.query(query, (err, result) => {
                if (err) {
                    console.log('ERROR While Query : ' + err.Message + '\n');
                }
                resolve(result);
            })
        } catch (error) {
            console.log('ERROR While Execute : ' + error + '\n');
        }
    })
}

module.exports = queryExecute;