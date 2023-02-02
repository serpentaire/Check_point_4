import Home from "@pages/Home";
import Footer from "@components/footer";
import Navbar from "@components/navbar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
