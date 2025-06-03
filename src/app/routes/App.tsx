import { JSX, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AppLayout = lazy(() => import("@pages/Layout/AppLayout"));
const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("@pages/SearchPage/SearchPage"));

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default App;
