var ClassSchema, RoleSchema, SchoolSchema, StudentSchema, TeacherSchema, db, mongoose;

db = require("../repositories/database");

mongoose = require("mongoose");

ClassSchema = new mongoose.Schema({
  section: String,
  year: Number,
  subject: String,
  location: String
});

RoleSchema = new mongoose.Schema({
  role: String,
  description: String
});

StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  roles: [RoleSchema],
  clazz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  },
  memberships: [{}]
});

TeacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  roles: [RoleSchema],
  clazzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classes'
    }
  ]
});

SchoolSchema = new mongoose.Schema({
  schoolName: String,
  address: String,
  phone: String,
  mail: String,
  website: String,
  students: [StudentSchema],
  teachers: [TeacherSchema],
  classes: [ClassSchema]
});

SchoolSchema.methods.populateUser = function(users) {
  return users.foreach(function(user, index) {
    if (user.clazz) {

    } else if (user.clazzes) {

    } else {
      throw new Error("Unable to save the user: User type unknown");
    }
  });
};

exports.clazz = mongoose.model('classes', ClassSchema);

exports.Student = mongoose.model('students', StudentSchema);

exports.Teacher = mongoose.model('teachers', TeacherSchema);

exports.School = mongoose.model('schools', SchoolSchema);
