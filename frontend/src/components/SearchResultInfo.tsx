import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurant Found in {city}
        <Link
          to="/"
          className="ml-2 text-sm font-semibold cursor-pointer text-blue-900 bg-gray-100 hover:bg-orange-500 hover:text-white transition-all py-2 px-3 rounded-full"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
