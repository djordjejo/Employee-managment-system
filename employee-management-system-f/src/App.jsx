import Landing_page from "./pages/Landing-page/Landing_page.jsx";
import SignIn from "./pages/Sign_in/Sign_in.jsx";
import GetStarted from "./pages/Get-Started-Page/GetStarted.jsx";
import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <Routes>
   
      <Route path="/" element={<Landing_page />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/getstarted" element={<GetStarted />} />"
    </Routes>
  );
}