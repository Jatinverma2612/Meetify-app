import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;