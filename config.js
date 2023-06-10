exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1/bq-v1';
// exports.dbUrl = process.env.DB_URL || 'mongodb://user:user@ac-linnzcf-shard-00-00.exbpgkw.mongodb.net:27017,ac-linnzcf-shard-00-01.exbpgkw.mongodb.net:27017,ac-linnzcf-shard-00-02.exbpgkw.mongodb.net:27017/?ssl=true&replicaSet=atlas-bcq9fc-shard-0&authSource=admin&retryWrites=true&w=majority';
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
