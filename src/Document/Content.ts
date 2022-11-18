import { model, Schema } from 'mongoose';

const contentSchema = new Schema({
  week: Number,
  description: String,
  material: [String],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
});

const Content = model('Content', contentSchema);
export default Content;
