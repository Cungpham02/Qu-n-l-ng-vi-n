import WithLoading from "./WithLoading";

function FetChingDtata({ data }) {
  console.log(data);
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}

export default WithLoading(FetChingDtata);
