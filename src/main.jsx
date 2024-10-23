import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import ViewPaste from "./components/ViewPaste";
import UpdatePaste from "./components/UpdatePaste";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path:"/pastes/update/:pasteId",
    element: (
      <div>
        <UpdatePaste/>
   
    
      </div>
    ),
  
  }
  ,
  {
    path: "/pastes",
    element: (
      <div>
        <Header />
        <Pastes />
      </div>
    ),
  },
  {
    path:"/pastes/view/:id",
    element:<div>
   
<ViewPaste/>
    </div>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
