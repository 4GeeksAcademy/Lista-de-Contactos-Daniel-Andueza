import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { EditContact } from "./pages/EditContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Login />} />   {/* 👈 primera vista */}
      <Route path="/home" element={<Home />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </Route>
  )
);

