import { model, Schema } from 'mongoose';

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  teacher: {
    type: String,
    required: true,
  },
  students: {
    type: [String],
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  slug: {
    type: String,
    require: true,
  },
});

const Course = model('Course', courseSchema);
export default Course;
