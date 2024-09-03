import { Avatar, Skeleton, Typography } from "@mui/material";

const UsernameSkeleton = () => {
  return (
    <div className="flex gap-3 py-[.43rem] px-3 bg-gray-100 rounded-lg">
      <Typography variant="h4" className="min-w-32">
        <Skeleton />
      </Typography>
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
    </div>
  );
};

export default UsernameSkeleton;
