module.exports = {
 db: process.env.DB || 'mongodb://192.168.99.100:27017/db',
 port: process.env.PORT || '8081'
};
