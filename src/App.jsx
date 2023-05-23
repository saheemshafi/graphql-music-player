import "./App.css";
import Navigation from "./components/Navigation";
import MainLayout from "./components/MainLayout";
import Player from "./components/Player";
function App() {
  return (
    <>
      <div id="main" className="main-container">
        <Navigation />
        <MainLayout />
        <Player />
      </div>
    </>
  );
}

export default App;
