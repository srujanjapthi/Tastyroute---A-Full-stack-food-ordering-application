// import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { CircleUser } from "lucide-react";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-5 font-semibold text-lg hover:bg-gray-300 transition-all gap-3 bg-gray-200 py-2 rounded-lg backdrop-blur-md outline-none">
          <span>{user?.name}</span>
          {user?.picture ? (
            <img className="w-10 rounded-full" src={user.picture} alt="" />
          ) : (
            <CircleUser className="bg-gray-300 w-10 h-10 p-1 rounded-full" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px] px-3">
          <DropdownMenuItem
            className="cursor-pointer flex justify-center py-3"
            asChild
          >
            <Link to="/" className="font-semibold text-[1.09rem]">
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex justify-center py-3"
            asChild
          >
            <Link to="/user-profile" className="font-semibold text-[1.09rem]">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex justify-center py-3"
            asChild
          >
            <Link to="/order-status" className="font-semibold text-[1.09rem]">
              Order Status
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer flex justify-center py-3"
            asChild
          >
            <Link
              to="/manage-restaurant"
              className="font-semibold text-[1.09rem]"
            >
              My Restaurant
            </Link>
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Button
              onClick={() => logout()}
              className="font-semibold flex flex-1 cursor-pointer text-[1.03rem]"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UsernameMenu;
