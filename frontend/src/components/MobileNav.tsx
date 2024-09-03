import { LogIn, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import MobileNavSkeleton from "./skeletons/MobileNavSkeleton";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent className="w-[350px]">
          <MobileNavSkeleton />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-4 w-[320px]">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex justify-between items-center font-bold gap-2">
              <SheetClose asChild>
                <Link to="/user-profile">
                  <img
                    className="w-10 rounded-full hover:scale-110 transition-all cursor-pointer"
                    src={user?.picture}
                    alt={`user-${user?.nickname}`}
                    draggable={false}
                  />
                </Link>
              </SheetClose>
              <div className="flex flex-col gap-[2px] items-end">
                <span>👋 {user?.name}</span>
                <Separator />
                <span className="font-medium text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-lg">
                  {user?.email}
                </span>
              </div>
            </span>
          ) : (
            <span>Welcom to TastyRoute.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-3">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              className="flex-1 flex gap-2 font-bold bg-orange-500"
              onClick={async () => await loginWithRedirect()}
            >
              <span>Login</span>
              <LogIn />
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
