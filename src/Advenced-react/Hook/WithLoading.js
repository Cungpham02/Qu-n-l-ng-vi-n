import { useState } from "react";
function WithLoading(Component) {
  const WithLoadingComponent = (props) => {
    const [data, setData] = useState([1, 2, 3]);
    if (!data || data.length === 0) return <>Loading...</>;
    return <Component data={data} {...props} />;
  };

  return WithLoadingComponent;
}

export default WithLoading;
