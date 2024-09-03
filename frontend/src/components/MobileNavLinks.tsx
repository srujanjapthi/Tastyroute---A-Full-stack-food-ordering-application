import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Building2, CircleUser, Home, ListOrdered, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { SheetClose } from "./ui/sheet";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <SheetClose asChild>
        <Link
          to="/"
          className="flex gap-3 justify-start py-[0.5rem] px-6 text-[1.04rem] border-2 hover:border-transparent rounded-lg bg-white items-center font-semibold hover:bg-gray-900 hover:text-white transition-all"
        >
          <Home />
          <span>Home</span>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to="/order-status"
          className="flex gap-3 justify-start py-[0.5rem] px-6 text-[1.04rem] border-2 hover:border-transparent rounded-lg bg-white items-center font-semibold hover:bg-gray-900 hover:text-white transition-all"
        >
          <ListOrdered />
          <span>Order Status</span>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to="/user-profile"
          className="flex gap-3 justify-start py-[0.5rem] px-6 text-[1.04rem] border-2 hover:border-transparent rounded-lg bg-white items-center font-semibold hover:bg-gray-900 hover:text-white transition-all"
        >
          <CircleUser />
          <span>User Profile</span>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          to="/manage-restaurant"
          className="flex gap-3 justify-start py-[0.5rem] px-6 text-[1.04rem] border-2 hover:border-transparent rounded-lg bg-white items-center font-semibold hover:bg-gray-900 hover:text-white transition-all"
        >
          <Building2 />
          <span>My Restaurant</span>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Button
          className="flex-1 flex gap-3 items-center text-[1.04rem] px-3 py-[0.5rem] font-semibold hover:bg-black shadow-md"
          onClick={() => logout()}
        >
          Logout
          <LogOut />
        </Button>
      </SheetClose>
    </>
  );
};

export default MobileNavLinks;
