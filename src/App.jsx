import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/** Pages */
import Home from "./components/Home";
import DetailsPage from "./components/DetailsPage";
import ErrorPage from "./components/ErrorPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<DetailsPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
