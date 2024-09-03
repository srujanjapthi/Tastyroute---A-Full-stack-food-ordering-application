import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton";
import { User } from "../../types";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  addressLine1: z.string().min(1, "Address line 1 is required."),
  city: z.string().min(1, "City is required."),
  country: z.string().min(4, "Country must be at least 4 characters long."),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  className?: string;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  className,
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [form, currentUser]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className={`bg-gray-50 space-y-4 rounded-lg p-5 py-7 md:p-10 ${className}`}
      >
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <FormDescription>
            View and change your profile information here.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white py-5" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            className="bg-gray-900 hover:bg-black transition-all hover:shadow-lg"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
