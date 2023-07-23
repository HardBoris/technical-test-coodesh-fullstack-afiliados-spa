import "./styles/global.css";
import "./styles/layout.css";
import { AppRouter } from "./routes";

function App() {
  return (
    <div>
      <header></header>
      <main>
        <AppRouter />
      </main>
      <footer>
        <div className="bg-logo">Powered by BG</div>
      </footer>
    </div>
  );
}

export default App;
