import { ORDER_STATUS } from "../config/order-status-config";
import { Order } from "../types";
import { Progress } from "./ui/progress";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime,
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${paddedHours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter flex flex-col gap-4 md:flex-row md:justify-between">
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
