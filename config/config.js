const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env) {
        case 'dev':
            return {
                bd_url_mongo: 'mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority',
                passwd_json: 'sarah',
                jwt_expires_in: 60
            }
        case 'hml': {
            return {
                bd_url_mongo: 'mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority',
                passwd_json: 'lucasSarah',
                jwt_expires_in: '365d'
            }
        }
        case 'prod': {
            return {
                bd_url_mongo: 'mongodb+srv://renato:Sat3t3ll@clusterapinodejscourse-qhdd3.mongodb.net/test?retryWrites=true&w=majority',
                passwd_json: 'KlksjkaYQU@*!*dsjdsjh',
                jwt_expires_in: '365d'
            }
        }
    }
}

console.log(`Iniciando API no ambiente: ${env.toUpperCase()}`);

module.exports = config();