import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GeneralAction } from "./actions";
import Loading from "./pages/Loading/Loading";

function App() {
  const { isAppLoading } = useSelector((state) => state.generalState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  if (isAppLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
