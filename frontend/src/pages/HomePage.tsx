import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="lgcustom:px-32 bg-white rounded-xl shadow-md py-7 px-5 flex flex-col gap-5 text-center -mt-20">
        <h1 className="text-[1.8rem] lg:text-[2.5rem] tracking-tight text-orange-600 font-semibold">
          Taste the Difference with{" "}
          <span className="font-bold text-orange-900 -tracking-tighter lg:tracking-tight">
            TastyRoute
          </span>
        </h1>
        <span className="text-md sm:text-lg md:text-xl">
          Experience the ease of online food ordering and savor the best dishes
          from around town.
        </span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landing image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bol text-3xl font-semibold tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download TastyRoutes App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="app download image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
