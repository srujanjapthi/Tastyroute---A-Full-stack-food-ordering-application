import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import LoadingAnimation from "../components/LoadingAnimation";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "../components/ui/card";
import OrderSummary from "../components/OrderSummary";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "../components/CheckoutButton";
import { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "../api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading: isGetLoading } =
    useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItem = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItem ? JSON.parse(storedCartItem) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // 1. Check if the menuItem is already in the cart.
      const exisitingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id,
      );

      let updatedCartItems: CartItem[];

      if (exisitingCartItem) {
        // 2. If menuItem is already in the cart, then update its quantity.
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // 3. If menuItem is not in the cart, then add it as a new menuItem.
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (currCartItem) => cartItem._id !== currCartItem._id,
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    // console.log(userFormData);

    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isGetLoading || !restaurant) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 6}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt="restaurantImg"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[3fr_2fr] gap-5 md:px-10">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
