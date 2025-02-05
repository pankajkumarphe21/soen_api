import { Router } from 'express';
import { body } from 'express-validator'
import { addUserToProject, createProjectController, getAllProject, getProjectById, updateFileTree } from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create', authUser, body('name').isString().withMessage('Name is required'), createProjectController);

router.get('/all/:email', authUser, getAllProject);

router.put('/add-user', authUser, body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'), addUserToProject);

router.get('/get-project/:projectId',authUser,getProjectById);

router.put('/fileTree/:projectId',authUser,updateFileTree);

export default router;