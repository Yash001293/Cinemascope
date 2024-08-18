import { useEffect, useState } from "react";
import fetchDataFromApi from "../utils/api";
// custom hook which returns data and loading state for perticular url;
const useFetch = (url) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
