import Order from '../models/order.js';
import OrderDto from '../dtos/order-dto.js';
import User from '../models/user.js';
import { AppErrorMissing } from '../utils/errors.js';
import status from '../config/status.js';
export default {
    async createOrder(req, res) {
        const data = req.body;

        const { phoneNumber } = data;

        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        const order = await Order.create({
            phoneNumber,
            userId: user.id,
        });
        await order.reload({
            include: [User],
        });
        const orderDto = new OrderDto(order);

        res.json(orderDto);
    },

    async updateOrder({ params: { orderId }, body: { status, phoneNumber, date } }, res) {
        const order = await Order.findOne({ where: { id: orderId } });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }

        await order.update({ status, phoneNumber, date });
        await order.reload({ include: [User] });
        const orderDto = new OrderDto(order);
        res.json(orderDto);
    },

    async getOrders(req, res) {
        const orders = await Order.findAll({
            include: [User],
        });
        const orderDtos = orders.map(order => new OrderDto(order));
        res.json(orderDtos);
    },

    async getOrder({ params: { orderId } }, res) {
        const order = await Order.findOne({ where: { id: orderId }, include: [User] });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }
        const orderDto = new OrderDto(order);
        res.json(orderDto);
    },

    async deleteOrder({ params: { orderId } }, res) {
        const order = await Order.findOne({ where: { id: orderId }, include: [User] });
        if (!order) {
            throw new AppErrorMissing('Order not found');
        }
        await order.destroy({ force: true });
        res.json({ success: true });
    },
};
