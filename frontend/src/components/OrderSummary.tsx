import { Trash2 } from "lucide-react";
import { CartItem } from "../pages/DetailPage";
import { Restaurant } from "../types";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPaisa = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );
    const totalWithDelivery = totalInPaisa + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((cartItem) => (
          <div className="flex justify-between">
            <span className="flex items-center">
              <Badge variant={"outline"} className="mr-2">
                {cartItem.quantity}
              </Badge>
              <div>{cartItem.name}</div>
            </span>
            <span className="flex items-center gap-1">
              ₹{((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
              <Trash2
                className="cursor-pointer ml-2"
                color="red"
                size={20}
                onClick={() => removeFromCart(cartItem)}
              />
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
