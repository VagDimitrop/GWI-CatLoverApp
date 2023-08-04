import './App.css';
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import TileComponent from "./components/tileComponent/TileComponent";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NavBarComponent>
                </NavBarComponent>
            </header>
            <TileComponent/>
        </div>
    );
}

export default App;
