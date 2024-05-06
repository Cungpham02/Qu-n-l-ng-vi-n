import { useState } from "react";

function useWithLoading(initState) {
  const [data, setData] = useState(initState);
  return {
    data,
    setData,
    isLoading: !data || data.length === 0,
  };
}

export default useWithLoading;
