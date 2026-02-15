import { createMemoryRouter } from "react-router";
import Root from "./Root";
import DiscoverPage from "./components/DiscoverPage";
import MyEventsPage from "./components/MyEventsPage";
import MyTicketsPage from "./components/MyTicketsPage";

export const router = createMemoryRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: DiscoverPage },
      { path: "my-events", Component: MyEventsPage },
      { path: "my-tickets/:eventId", Component: MyTicketsPage },
    ],
  },
]);