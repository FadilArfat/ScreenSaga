import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Home />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
