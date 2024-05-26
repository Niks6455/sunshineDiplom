import { DataTypes, Model } from 'sequelize';
import EnumRoles from '../config/roles.js';
import EnumStatus from '../config/status.js';

export default class Order extends Model {
    static initialize(sequelize) {
        Order.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: EnumStatus['В обработке'],
                    validate: {
                        isIn: [Object.values(EnumStatus)],
                    },
                },
                phoneNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }

            },
            {
                sequelize,
                schema: 'public',
                modelName: 'Order',
                tableName: 'orders',
                paranoid: true,
            }
        );
    }
}
