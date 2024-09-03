import ReactLoading from "react-loading";

const LoadingAnimation = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center">
      <ReactLoading type="cylon" color="#333333" width={60} />
      <span className="text-md md:text-lg font-semibold text-gray-700">
        Please wait...
      </span>
    </div>
  );
};

export default LoadingAnimation;
