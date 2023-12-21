import NavBar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main className="px-6 overflow-x-hidden pb-16">
        <div className="container my-0 mx-auto max-w-5xl w-full mt-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
