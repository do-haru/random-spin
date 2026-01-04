import "./App.css";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <main className="AppMain">
        <Main />
      </main>
      <footer className="AppFooter">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
