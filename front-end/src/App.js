import { NewsReader } from "./NewsReader";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="header-modern">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <h1 className="app-title">NewsHub</h1>
          </div>
          <div className="text-muted">
            <i className="fas fa-globe"></i> Stay informed with the latest news
          </div>
        </div>
      </header>
      <NewsReader />
    </div>
  );
}

export default App;
