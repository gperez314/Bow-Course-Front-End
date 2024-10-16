import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.component";
import Footer from "../components/footer/Footer.component";

function View() {
  return (
    <div className="view-container">
      <Header />
      <div className="view-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default View;
