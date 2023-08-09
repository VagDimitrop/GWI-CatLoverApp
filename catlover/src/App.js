import './App.css';
import {BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import NavBarComponent from "./components/navBarComponent/NavBarComponent";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage"
import BreedsPage from "./pages/BreedsPage";
import React, {useState} from "react";
import LoaderComponent from "./components/loaderComponent/LoaderComponent";

function App() {
    // The showLoader variable holds the data on whether the loader should be displayed or not
    const [showLoader, setShowLoader] = useState()

    // This is a callback function passed to all children pages in order for them to toggle the
    // display of the loader
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
                    <Route path="/" element={<HomePage isLoadingCallback = {isLoading}/>} />
                    <Route path="/home" element={<HomePage isLoadingCallback = {isLoading}/>} />
                    <Route path="/favorites" element={<FavoritesPage isLoadingCallback = {isLoading}/>} />
                    <Route path="/breeds" element={<BreedsPage isLoadingCallback = {isLoading}/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
