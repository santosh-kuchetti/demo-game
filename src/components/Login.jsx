import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();

		if (username && password) {
			console.log("Logging in with:", username, password);
			localStorage.setItem("username", username);
			localStorage.setItem("password", password);
			localStorage.setItem("login", true);
		}
		setUsername("");
		setPassword("");
		navigate("/create-game");
	};

	useEffect(() => {
		const localUsername = localStorage.getItem("username");
		const localPassword = localStorage.getItem("password");

		if (localUsername && localPassword) {
			setTimeout(() => {
				navigate("/create-game");
			}, 2000);
		}
	}, []);

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div className="input-container">
					<label>
						Username:
						<input
							type="text"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							required
						/>
					</label>
				</div>
				<div className="input-container">
					<label>
						Password:
						<input
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</label>
				</div>
				<div>
					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
