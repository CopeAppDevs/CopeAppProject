(function() {
  var Sequelize, db,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  db = require("../sequelize");

  Sequelize = require("sequelize");


  /*
  
      hasOne: create reference in TARGET
      belongsTo: create referenceIn SOURCE
      hasMany: create reference in TARGET
      belongsToMany: manyToMany
  
  
      Sequelize.STRING                      // VARCHAR(255)
      Sequelize.STRING(1234)                // VARCHAR(1234)
      Sequelize.STRING.BINARY               // VARCHAR BINARY
      Sequelize.TEXT                        // TEXT
      Sequelize.TEXT('tiny')                // TINYTEXT
  
      Sequelize.INTEGER                     // INTEGER
      Sequelize.BIGINT                      // BIGINT
      Sequelize.BIGINT(11)                  // BIGINT(11)
  
      Sequelize.FLOAT                       // FLOAT
      Sequelize.FLOAT(11)                   // FLOAT(11)
      Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
  
      Sequelize.REAL                        // REAL        PostgreSQL only.
      Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
      Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.
  
      Sequelize.DOUBLE                      // DOUBLE
      Sequelize.DOUBLE(11)                  // DOUBLE(11)
      Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
  
      Sequelize.DECIMAL                     // DECIMAL
      Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
  
      Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
      Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
      Sequelize.DATEONLY                    // DATE without time.
      Sequelize.BOOLEAN                     // TINYINT(1)
  
      Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
      Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
  
      Sequelize.JSON                        // JSON column. PostgreSQL only.
      Sequelize.JSONB                       // JSONB column. PostgreSQL only.
  
      Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
      Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
  
      Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)
  
      Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
      Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
      Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
      Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
      Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.
  
      Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.
  
      Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
      Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type.  PostgreSQL (with PostGIS) or MySQL only.
      Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
  
      validate: {
        is: ["^[a-z]+$",'i'],     // will only allow letters
        is: /^[a-z]+$/i,          // same as the previous example using real RegExp
        not: ["[a-z]",'i'],       // will not allow letters
        isEmail: true,            // checks for email format (foo@bar.com)
        isUrl: true,              // checks for url format (http://foo.com)
        isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
        isIPv4: true,             // checks for IPv4 (129.89.23.1)
        isIPv6: true,             // checks for IPv6 format
        isAlpha: true,            // will only allow letters
        isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
        isNumeric: true,          // will only allow numbers
        isInt: true,              // checks for valid integers
        isFloat: true,            // checks for valid floating point numbers
        isDecimal: true,          // checks for any numbers
        isLowercase: true,        // checks for lowercase
        isUppercase: true,        // checks for uppercase
        notNull: true,            // won't allow null
        isNull: true,             // only allows null
        notEmpty: true,           // don't allow empty strings
        equals: 'specific value', // only allow a specific value
        contains: 'foo',          // force specific substrings
        notIn: [['foo', 'bar']],  // check the value is not one of these
        isIn: [['foo', 'bar']],   // check the value is one of these
        notContains: 'bar',       // don't allow specific substrings
        len: [2,10],              // only allow values with length between 2 and 10
        isUUID: 4,                // only allow uuids
        isDate: true,             // only allow date strings
        isAfter: "2011-11-05",    // only allow date strings after a specific date
        isBefore: "2011-11-05",   // only allow date strings before a specific date
        max: 23,                  // only allow values
        min: 23,                  // only allow values >= 23
        isArray: true,            // only allow arrays
        isCreditCard: true,       // check for valid credit card numbers
  
        // custom validations are also possible:
        isEven: function(value) {
          if(parseInt(value) % 2 != 0) {
            throw new Error('Only even values are allowed!')
          // we also are in the model's context here, so this.otherField
          // would get the value of otherField if it existed
   */

  exports.Group = db.sequelize.define("group", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        len: [10, 200]
      }
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: "groupDefault"
    }
  });

  exports.School = db.sequelize.define("school", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    region: {
      type: Sequelize.STRING,
      validate: {
        isUppercase: true,
        is: ["[a-zA-Z]", "i"]
      }
    },
    field: {
      type: Sequelize.STRING,
      validate: {
        len: [4, 32]
      }
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        len: [4, 64],
        isEmail: true
      }
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        len: [4, 32]
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'region', 'field', 'email', 'phone']
      }
    ]
  });

  exports.Media = db.sequelize.define("media", {
    userImage: {
      type: Sequelize.STRING,
      defaultValue: "default"
    },
    backgroundImage: {
      type: Sequelize.STRING,
      defaultValue: "default"
    },
    style: {
      type: Sequelize.STRING,
      defaultValue: "default",
      validate: {
        isIn: [["dark", "light"]]
      }
    }
  });

  exports.Memberships = db.sequelize.define("memberships", {
    roles: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      validate: {
        isInList: function(rolesList) {
          var acceptable, i, len, r, results;
          acceptable = ["admin", "moderator", "publisher", "student", "teacher", "bidello"];
          results = [];
          for (i = 0, len = rolesList.length; i < len; i++) {
            r = rolesList[i];
            if (indexOf.call(acceptable, r) < 0) {
              throw new Error('accepted only the following values \n: \t "admin", "moderator", "publisher", "student", "teacher", "bidello"');
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    }
  });

  exports.User = db.sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      get: function() {
        return this.getDataValue('firstname');
      },
      set: function(firstName) {
        return this.setDataValue('firstName', firstName);
      },
      validate: {
        len: [4, 24],
        is: ["[a-zA-Z ]", "i"]
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      get: function() {
        return this.getDataValue('lastname');
      },
      set: function(lastName) {
        return this.setDataValue('lastName', lastName);
      },
      validate: {
        len: [4, 24],
        is: ["[a-zA-Z ]", "i"]
      }
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      get: function() {
        return this.getDataValue('username');
      },
      set: function(username) {
        return this.setDataValue('username', username);
      },
      validate: {
        len: [4, 16],
        is: ["[a-zA-Z_]", "i"]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        len: [4, 64],
        isEmail: true
      }
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['username']
      }, {
        unique: true,
        fields: ['email']
      }
    ]
  });

}).call(this);
