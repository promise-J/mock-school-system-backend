import Header from "../header/Header";
import "./layout.css";
import Sidebar from "../sidebar/Sidebar";

function StudentLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar student />

        {children}
      </div>
    </div>
  );
}

export default StudentLayout;
