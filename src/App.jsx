import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GeneralAction } from "./actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
