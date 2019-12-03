const mysql = require('mysql');

const connection = async params =>
  new Promise((resolve, reject) => {
    const connection = mysql.createPool(params);
    connection.getConnection(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });

module.exports = connection;
