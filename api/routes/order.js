import { Router } from 'express';
import orderController from '../controllers/order.js';
import { asyncRoute } from '../utils/errors.js';
import { authenticateToken } from '../middlewares/checkToken.js';
import checkRole from '../middlewares/checkRoles.js';
import roles from '../config/roles.js';

const router = Router();

router
    .route('/getOrders')
    .get(authenticateToken, asyncRoute(checkRole([roles.ADMINISTRATOR])), asyncRoute(orderController.getOrders));
router
    .route('/getOrder/:orderId')
    .get(
        authenticateToken,
        asyncRoute(checkRole([roles.ADMINISTRATOR, roles.USER])),
        asyncRoute(orderController.getOrder)
    );
router
    .route('/createOrder')
    .post(
        authenticateToken,
        asyncRoute(checkRole([roles.USER, roles.ADMINISTRATOR])),
        asyncRoute(orderController.createOrder)
    );
router
    .route('/updateOrder/:orderId')
    .post(authenticateToken, asyncRoute(checkRole([roles.ADMINISTRATOR])), asyncRoute(orderController.updateOrder));
router
    .route('/deleteOrder/:orderId')
    .post(authenticateToken, asyncRoute(checkRole([roles.ADMINISTRATOR])), asyncRoute(orderController.deleteOrder));

export default router;
