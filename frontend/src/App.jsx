import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import DashBoard from "./pages/DashBoard";
import TransferMoneyPage from "./pages/TransferMoneyPage";
import SignInPage from "./pages/SignInPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import CreatePage from "./pages/CreatePage";
import AllProducts from "./pages/AllProducts";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<SignInPage />}></Route>
            <Route path="/" element={<SignUpPage />}></Route>
            <Route path="/send" element={<TransferMoneyPage />}></Route>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/dashboard/create/:id" element={<CreatePage />} />
            <Route
              path="/dashboard/Allproducts/:id"
              element={<AllProducts />}
            />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
