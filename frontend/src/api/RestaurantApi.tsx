import { useQuery } from "react-query";
import { Restaurant, RestaurantSearchResponse } from "../types";
import { SearchState } from "../pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const createGetRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`,
    );

    if (!response.ok) {
      throw new Error("Failed to get Restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    createGetRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    },
  );

  return {
    restaurant,
    isLoading,
  };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string,
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurant", searchState],
    createSearchRequest,
    {
      enabled: !!city,
    },
  );

  return {
    results,
    isLoading,
  };
};
