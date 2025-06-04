import { JSX, lazy } from "react";
import { Route, Routes } from "react-router";

const AppLayout = lazy(() => import("@pages/Layout/AppLayout"));
const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("@pages/SearchPage/SearchPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage/NotFoundPage")); // 새로 추가

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
