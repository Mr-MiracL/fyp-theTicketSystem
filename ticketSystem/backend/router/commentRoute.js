
import express from 'express';
import { getCommentsForEvent, addComment } from '../controllers/commentController.js';
import { verifyToken, } from '../utils/verifyToken.js';

const router = express.Router();


router.get('/event/:eventId', getCommentsForEvent);

router.post('/event/:eventId', verifyToken, addComment);

export default router;
