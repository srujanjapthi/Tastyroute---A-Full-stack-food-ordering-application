import { useGetMyOrders } from "../api/OrderApi";
import LoadingAnimation from "../components/LoadingAnimation";
import OrderStatusDetail from "../components/OrderStatusDetail";
import OrderStatusHeader from "../components/OrderStatusHeader";
import { AspectRatio } from "../components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!orders || orders.length === 0) {
    return <span>No Orders Found...</span>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 shadow-md p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 7}>
              <img
                className="rounded-md object-cover h-full w-full"
                src={order.restaurant.imageUrl}
                alt="restaurant-image"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
