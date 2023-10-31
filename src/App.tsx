import Main from "pages/Main";
import React, { FunctionComponent } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App: FunctionComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
