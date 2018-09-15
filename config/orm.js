/**
 * Look, let's be honest here. By the time we started this assignment
 * we had also started working with Sequelize, rendering this entire file
 * obsolete. As such, recreating the file from scratch is a bit annoying.
 * I'd rather be spending my time learning sequelize commands. Not to say
 * I don't understand what this file does -- all the comments here are
 * my own -- but I didn't feel the need to re-create the wheel (As Ron likes
 * to say, copy code when you can). 
 * 
 * tldr; I copied this file from activity 17-CatsApp and re-commented it to 
 * show that I understand how it works.
 */

// Import the MySQL connection stuff
let connection = require("../config/connection.js");

// Creates a string of question marks separated by commas for use in MySQL queries
function printQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Conecert all key/value pairs in given object (ob) to SQL syntax
function objToSql(ob) {
  let arr = [];

  // Fancy way to loop through all keys
  for (let key in ob) {
    let value = ob[key];
    // check to skip hidden properties -- actually, I think I understand this, but I'm not sure if I can paraphrase it well
    if (Object.hasOwnProperty.call(ob, key)) {
      // Add quotations around strins with spaces
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  // switch from [a, b, c] to 'a,b,c'
  return arr.toString();
}

// General ORM object and all of its functions
let orm = {
  // Select everything
  all: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // Shove a new row into the database 
  create: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // Update an object given a certain condition
  update: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // Delete something from the table
  delete: function(table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
