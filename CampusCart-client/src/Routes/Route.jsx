import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AddTask from "../Components/AddTask/AddTask";
import Home from "../Components/Home/Home";
import BrowseTasks from "../Components/BrowseTasks/BrowseTasks";
import MyTasks from "../Components/MyTasks/MyTasks";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/Error/ErrorPage";
import CardDetails from "../Components/CardDetails/CardDetails";
import UpdateTask from "../Components/UpdateTask/UpdateTask";
import Loading from "../Components/Loading/Loading";
import UpdateUserProfile from "../Components/UpdateUserInfo/UpdateUserInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/products/featuredProducts"),
        hydrateFallbackElement: <Loading></Loading>,
        element: <Home></Home>,
      },
      {
        path: "/addListing",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/exploreProducts",
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement: <Loading></Loading>,
        element: <BrowseTasks></BrowseTasks>,
      },
      {
        path: "/exploreProducts/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <CardDetails></CardDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateUserProfile></UpdateUserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/myTasks",
        // loader: () => fetch("https://freelancing-marketplace-server.vercel.app/tasks"),
        // hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <MyTasks></MyTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTask/:id",
        // loader: ({ params }) =>
        //   fetch(`https://freelancing-marketplace-server.vercel.app/updateTask/${params.id}`),
        // hydrateFallbackElement: <Loading></Loading>,
        element: <UpdateTask></UpdateTask>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
