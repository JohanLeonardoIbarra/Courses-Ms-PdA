import courseController from 'Controller/CourseController';
import { Router } from 'express';
import validateToken from 'Middleware/Auth';

const courseRouter = Router();

courseRouter.post('/', validateToken, courseController.create);
courseRouter.get('/', validateToken, courseController.list);
courseRouter.get('/:id', validateToken, courseController.findCourse);
courseRouter.post('/add/student', validateToken, courseController.addStudent);

export default courseRouter;
