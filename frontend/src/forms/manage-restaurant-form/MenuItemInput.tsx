import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex mdcustom:flex-row mdcustom:items-end items-start gap-2 flex-col p-3 rounded-lg bg-gray-100 lgcustom:w-[70%]">
      <div className="flex flex-col mdcustom:flex-row gap-2 w-full">
        <FormField
          control={control}
          name={`menuItem.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cheese pizza"
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItem.${index}.price`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="flex items-center gap-1">
                Price (₹) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="130.45" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 hover:bg-red-700"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
