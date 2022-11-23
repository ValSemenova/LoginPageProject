import { Login } from "./components/Login/Login";

function App() {
  return (
    <div className="app" data-testid="app">
      <div className="overlay">
        <Login />
      </div>
    </div>
  );
}

export default App;
