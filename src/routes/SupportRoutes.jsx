import { Route, Routes } from "react-router-dom";
import Contacts from "../pages/Contacts";

export default function SupportRoutes () {
  return (
    <Routes>
      <Route path="/contactus" element={<Contacts />} />
    </Routes>
  );
}
