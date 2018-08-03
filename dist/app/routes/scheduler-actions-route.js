import express from 'express';
import scheduler from '../controllers/scheduler-actions-controller';

let router = express.Router();

router.put("/scheduler/actions/start", scheduler.start);
router.put("/scheduler/actions/stop", scheduler.stop);
router.put("/scheduler/actions/refresh", scheduler.refresh);

export default router;