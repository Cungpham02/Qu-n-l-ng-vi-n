import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routers } from "./config/routers";
import { Fragment } from "react";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routers.map((item, index) => {
            let Layout = item.layout;
            if (Layout != null) {
              Layout = item.layout;
            } else if (Layout == null) {
              Layout = Fragment;
            }
            let Page = item.element;
            return (
              <Route
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                path={item.compoment}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
