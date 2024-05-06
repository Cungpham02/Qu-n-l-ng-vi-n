import Header from "../Header/Header";
function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <>{children}</>
    </div>
  );
}

export default DefaultLayout;
