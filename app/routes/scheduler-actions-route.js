import express from 'express';
import scheduler from '../controllers/scheduler-actions-controller';

let router = express.Router();

router.post("/scheduler/actions/start", scheduler.start);
router.post("/scheduler/actions/stop", scheduler.stop);
router.post("/scheduler/actions/refresh", scheduler.refresh);

export default router;