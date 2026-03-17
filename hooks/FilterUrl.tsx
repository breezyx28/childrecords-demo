const FilterUrl = ({
  url,
  searchParam,
}: {
  url: string;
  searchParam: string;
}) => {
  // Create a URLSearchParams object with the URL search parameters
  const searchParams = new URLSearchParams(url.split("?")[1]);

  // Get the value of a specific query parameter
  const paramValue = searchParams.get(searchParam);

  return paramValue;
};

export default FilterUrl;
