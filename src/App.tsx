import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home/index";
import Payment from "@/pages/Payment/index";
import Account from "@/pages/Account/index";
import Qrcode from "@/pages/Qrcode/index";
import Services from "@/pages/Services/index";
import Balance from "@/pages/Balance/index";
import Help from "@/pages/Help/index";
import Settings from "@/pages/Settings/index";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/account" element={<Account />} />
          <Route path="/qrcode" element={<Qrcode />} />
          <Route path="/services" element={<Services />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
