import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Login />}
					/>
					<Route
						path="/create-game"
						element={<GameForm />}
					/>
					<Route
						path="/list"
						element={<GameList />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
