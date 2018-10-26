db = require("../repositories/database")
mongoose = require("mongoose")

SettingsSchema = new mongoose.Schema({
  theme: {type: String, lowercase:true},
  profilePicture: String
})

ClassSchema = new mongoose.Schema({
  section: {type: String, required: [true, "Section for class is required"]},
  grade: {type: String, required: [true, "Grade for class is required"]},
  subject: {type: String, required: [true, "Subject for class is required"]},
  location: {type: String, required: [true, "Location for class is required"]}
})

RoleSchema = new mongoose.Schema({
  role: {type: String, required: [true, "Role for role is required"]},
  description: {type: String, required: [true, "Description for role is required"]}
})

StudentSchema = new mongoose.Schema({
  firstName: {type: String, required: [true, "FirstName for student is required"]},
  lastName: {type: String, required: [true, "LastName for student is required"]},
  username: {type: String, required: [true, "Username for student is required"]},
  password: {type: String, required: [true, "Password for student is required"]},
  email: {type: String, required: [true, "Email for student is required"]},
  roles: [{type: mongoose.Schema.Types.ObjectId , ref: 'roles'}],
  clazz: {type: mongoose.Schema.Types.ObjectId , ref: 'classes'},
  settings: {type: mongoose.Schema.Types.ObjectId, ref: 'settings'}
})

TeacherSchema = new mongoose.Schema({
  firstName: {type: String, required: [true, "FirstName for teacher is required"]},
  lastName: {type: String, required: [true, "LastName for teacher is required"]},
  username: {type: String, required: [true, "Username for teacher is required"]},
  password: {type: String, required: [true, "Password for teacher is required"]},
  email: {type: String, required: true},
  roles: [{type: mongoose.Schema.Types.ObjectId , ref: 'roles'}],
  clazzes: [{type: mongoose.Schema.Types.ObjectId , ref: 'classes'}],
  settings: {type: mongoose.Schema.Types.ObjectId, ref: 'settings'}
})

SchoolSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Name for school is required"]},
  address: String,
  phone: String,
  mail: String,
  website: String,

  students: [StudentSchema],
  teachers: [TeacherSchema],
  classes: [ClassSchema]
})

SettingsSchema.set("minimize": false);
ClassSchema.set("minimize": false);
RoleSchema.set("minimize": false);
StudentSchema.set("minimize": false);
TeacherSchema.set("minimize": false);
SchoolSchema.set("minimize": false);

SettingsSchema.plugin(require('mongoose-autopopulate'));
ClassSchema.plugin(require('mongoose-autopopulate'));
RoleSchema.plugin(require('mongoose-autopopulate'));
StudentSchema.plugin(require('mongoose-autopopulate'));
TeacherSchema.plugin(require('mongoose-autopopulate'));
SchoolSchema.plugin(require('mongoose-autopopulate'));

exports.Class = mongoose.model('classes', ClassSchema)
exports.Role = mongoose.model('roles', RoleSchema)
exports.Student = mongoose.model('students', StudentSchema)
exports.Teacher = mongoose.model('teachers', TeacherSchema)
exports.School = mongoose.model('schools', SchoolSchema)
