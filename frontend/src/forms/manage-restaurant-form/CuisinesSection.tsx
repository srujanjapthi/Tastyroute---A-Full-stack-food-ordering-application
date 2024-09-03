import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { cuisineList } from "../../config/restaurant-options-config";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisineList.map((cuisineItem) => (
                <CuisineCheckBox cuisine={cuisineItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
