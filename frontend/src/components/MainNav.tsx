import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import UsernameSkeleton from "./skeletons/UsernameSkeleton";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <UsernameSkeleton />;
  }

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-semibold text-xl px-5 py-6 hover:bg-black hover:text-white border-[1px] border-gray-900 bg-gray-200 shadow-md"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default MainNav;
