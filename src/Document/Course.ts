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
  },
});

const Course = model('Course', courseSchema);
export default Course;
