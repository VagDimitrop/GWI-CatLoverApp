import './App.css';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage"

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NavBarComponent>
                </NavBarComponent>
            </header>
            <Router>
                <Routes>
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/favorites" element={<FavoritesPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
