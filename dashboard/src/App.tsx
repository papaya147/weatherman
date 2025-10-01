import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/nova/theme.css";
import History from "./History";
import Prediction from "./Prediction";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import SingleGraph from "./SingleGraph";

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

const Root = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Prediction />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:graphField" element={<SingleGraph />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
