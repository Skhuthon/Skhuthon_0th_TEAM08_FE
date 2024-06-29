import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import List from "./List";
import WritePage from "./WritePage";
import DetailPage from "./DetailPage";
import Btn from "./Btn";
import Weather from "../weather/Weather";
import { DiaryProvider } from "../DiaryContext";

const Home = () => {
  return (
    <Router>
      <DiaryProvider>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Btn />
                <List />
                <Weather />
              </>
            }
          />
          <Route path="/write" element={<WritePage />} />
          <Route path="/edit/:postId" element={<WritePage />} />
          <Route path="/detail/:postId" element={<DetailPage />} />
        </Routes>
      </DiaryProvider>
    </Router>
  );
};

export default Home;
