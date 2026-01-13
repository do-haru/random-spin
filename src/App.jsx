import "./App.css";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <main className="AppMain">
        <Main />
      </main>
      <footer className="AppFooter">
        <Footer />
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
