import { useGetMyUser, useUpdateMyUser } from "../api/MyUserApi";
import LoadingAnimation from "../components/LoadingAnimation";
import UserProfileForm from "../forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <LoadingAnimation />;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      className="shadow-lg"
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
