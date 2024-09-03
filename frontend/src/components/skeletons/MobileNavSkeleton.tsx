import Skeleton from "@mui/material/Skeleton";
import { Separator } from "../ui/separator";

const RectangularSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" className="w-full h-full py-[1.23rem]" />
    </div>
  );
};

const MobileNavSkeleton = () => {
  return (
    <>
      <div>
        <span className="flex justify-between items-center font-bold gap-2">
          <Skeleton variant="circular" width={45} height={45} />
          <div className="flex flex-col gap-[2px] items-end">
            <Skeleton variant="text" width={160} height={43} />
            <Separator />
            <Skeleton variant="text" width={180} height={30} />
          </div>
        </span>
      </div>
      <Separator className="border-[1px] mt-2" />
      <div className="space-y-2 mt-4">
        {[1, 2, 3, 4, 5].map((_) => (
          <RectangularSkeleton />
        ))}
      </div>
    </>
  );
};

export default MobileNavSkeleton;
