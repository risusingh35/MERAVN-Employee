const dbConfig = {
    uri: process.env.mongoURL,
};

const portConfig = {
    port: process.env.PORT,
};

module.exports = { dbConfig, portConfig };
