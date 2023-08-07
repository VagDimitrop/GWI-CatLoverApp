import './App.css';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage"
import React, {useState} from "react";
import LoaderComponent from "./components/loaderComponent/LoaderComponent";

function App() {
    const [showLoader, setShowLoader] = useState()
    const isLoading = (data) => {
        setShowLoader(data)
    }

    return (
        <div className="App">
                <LoaderComponent
                    showLoader={showLoader}
                ></LoaderComponent>
            <header className="App-header">
                <NavBarComponent>
                </NavBarComponent>
            </header>
            <Router>
                <Routes>
                    <Route path="/home" element={<HomePage isLoadingCallback = {isLoading}/>} />
                    <Route path="/favorites" element={<FavoritesPage  isLoadingCallback = {isLoading}/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
