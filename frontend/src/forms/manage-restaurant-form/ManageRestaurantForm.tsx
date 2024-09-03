import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";
import { Restaurant } from "../../types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select atleast one item",
    }),
    menuItem: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      }),
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, {
        message: "Image is required",
      })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItem: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2),
    );

    const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItem: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    // (formDataJson.deliveryPrice * 100).toString() => Here the deliveryPrice is multiplied by 100 because the Lowest Currency Denomination (LCD) of Indian Rupee is 1 paisa. (1Rs = 100paisa)
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString(),
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString(),
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItem.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString(),
      );
    });

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-4 py-6 md:p-10 rounded-lg shadow-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
