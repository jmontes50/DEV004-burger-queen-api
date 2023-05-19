exports.port = process.argv[2] || process.env.PORT || 8080;
exports.dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1/bq-v1';
// exports.dbUrl = process.env.DB_URL || 'user:user@cluster0.exbpgkw.mongodb.net/?retryWrites=true&w=majority';
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
