import { JSX, lazy } from "react";
import { Route, Routes } from "react-router";

const AppLayout = lazy(() => import("@pages/Layout/AppLayout"));
const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("@pages/SearchPage/SearchPage"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage/NotFoundPage"));
const CallbackPage = lazy(() => import("@pages/CallbackPage/CallbackPage"));
const PlaylistDetailPage = lazy(
  () => import("@pages/PlaylistDetailPage/PlaylistDetailPage"),
);

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="playlist/:id" element={<PlaylistDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default App;
