import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "../../components/ui/aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const exisitingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the exisiting one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {exisitingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              className="rounded-2xl object-cover h-full w-full"
              src={exisitingImageUrl}
              alt="exisitingImage"
              draggable={false}
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
