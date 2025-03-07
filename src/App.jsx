import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
