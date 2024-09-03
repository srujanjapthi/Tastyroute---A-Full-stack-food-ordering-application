import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and price.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        style={{ marginTop: "1rem" }}
        onClick={() => append({ name: "", price: "" })}
      >
        Add menu item
      </Button>
    </div>
  );
};

export default MenuSection;
