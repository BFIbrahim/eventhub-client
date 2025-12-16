import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Events from "../Pages/Event/Events";
import EventDetails from "../Pages/EventDetails/EventDetails";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegistrationPage";
import EventRegistration from "../Pages/EventRegistration/EventRegistration";
import AddEvent from "../Pages/AddNewEvent/AddNewEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "/events",
          Component: Events
        },
        {
          path: "eventsDetails/:id",
          Component: EventDetails
        },
        {
          path:'/eventregister',
          Component: EventRegistration
        },
        {
          path: '/add-new-event',
          Component: AddEvent
        }
    ]
  },
  {
    path:'/login',
    Component: LoginPage
  },
  {
    path: '/register',
    Component: RegisterPage
  }
]);