import { Request, Response } from 'express';
import Course from 'Document/Course';

const courseController = {
  create: async (request: Request, response: Response) => {
    const { user, name, description, code } = request.body;

    if ([name, description, code].includes(undefined))
      return response.sendStatus(400);
    if (user.role !== 'teacher') return response.sendStatus(401);

    const courseRepeated = await Course.findOne({ name });

    if (courseRepeated)
      return response
        .status(400)
        .send({ message: 'This course already exist' });

    const course = new Course({
      name,
      description,
      code,
      teacher: user.email,
    });

    course.save();

    return response.sendStatus(200);
  },

  list: async (request: Request, response: Response): Promise<Response> => {
    const { user } = request.body;

    if (user.role === 'teacher') {
      const courses = await Course.find({
        teacher: user.email,
      });

      return response.send(courses);
    } else if (user.role === 'student') {
      const courses = await Course.find({
        students: { $elemMatch: { $eq: user.email } },
      });

      return response.send(courses);
    }

    return response.sendStatus(401);
  },

  addStudent: async (request: Request, response: Response) => {
    const { user, email, course } = request.body;

    if (!email && !course) response.sendStatus(400);
    if (user.role !== 'teacher') return response.sendStatus(401);

    try {
      const status = await Course.findOneAndUpdate(
        {
          _id: course,
          students: { $not: { $elemMatch: { $eq: email } } },
        },
        { $push: { students: email } },
        { new: true }
      );

      if (!status) return response.sendStatus(404);

      return response.sendStatus(200);
    } catch (error) {
      console.log(error);

      return response.sendStatus(500);
    }
  },
};

export default courseController;
