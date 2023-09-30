import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import "../styles/GameList.css";
import { useNavigate } from "react-router-dom";

const GameList = () => {
    const navigate = useNavigate();
	const [data, setData] = useState(getGameData());
	const [searchTerm, setSearchTerm] = useState("");

	function getGameData() {
		const games = JSON.parse(localStorage.getItem("games")) || [];
		return games.map((game, index) => ({
			key: index,
			name: game.name,
			url: game.url,
			author: game.author,
			published_date: game.published_date,
			editing: false, // Add an editing property for each record
		}));
	}

	const handleEdit = (record) => {
		setData((prevData) => {
			return prevData.map((game) => {
				if (game.key === record.key) {
					return { ...game, editing: true };
				}
				return game;
			});
		});
	};

	const handleSave = (record) => {
		setData((prevData) => {
			const updatedData = prevData.map((game) => {
				if (game.key === record.key) {
					return { ...game, editing: false };
				}
				return game;
			});

			localStorage.setItem("games", JSON.stringify(updatedData)); // Save to local storage

			return updatedData; // Update state
		});
	};

	const handleInputChange = (e, key, field) => {
		const { value } = e.target;
		//  setSearchTerm(value);
		setData((prevData) => {
			return prevData.map((game) => {
				if (game.key === key) {
					return { ...game, [field]: value };
				}
				return game;
			});
		});
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text, record) =>
				record.editing ? (
					<Input
						value={text}
						onChange={(e) => handleInputChange(e, record.key, "name")}
					/>
				) : (
					text
				),
		},
		{
			title: "URL",
			dataIndex: "url",
			key: "url",
			render: (text, record) =>
				record.editing ? (
					<Input
						value={text}
						onChange={(e) => handleInputChange(e, record.key, "url")}
					/>
				) : (
					text
				),
		},
		{
			title: "Author",
			dataIndex: "author",
			key: "author",
			render: (text, record) =>
				record.editing ? (
					<Input
						value={text}
						onChange={(e) => handleInputChange(e, record.key, "author")}
					/>
				) : (
					text
				),
		},
		{
			title: "Published Date",
			dataIndex: "published_date",
			key: "published_date",
			render: (text, record) =>
				record.editing ? (
					<Input
						value={text}
						onChange={(e) => handleInputChange(e, record.key, "published_date")}
					/>
				) : (
					text
				),
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					{record.editing ? (
						<Button
							type="primary"
							onClick={() => handleSave(record)}>
							Save
						</Button>
					) : (
						<Button
							type="primary"
							onClick={() => handleEdit(record)}>
							Edit
						</Button>
					)}
					<Button
						type="danger"
						onClick={() => handleDelete(record)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const handleDelete = (record) => {
		const updatedGames = data.filter((game) => game.key !== record.key);
		localStorage.setItem("games", JSON.stringify(updatedGames));
		setData(updatedGames);
	};

	const pagination = {
		pageSize: 5,
		total: data.length,
	};

	return (
		<div>
			<h2>List of Games</h2>
			<div
				style={{
					display: "flex",
					// justifyContent: "space-between",
					// alignItems: "center",
					flexDirection: "column",
					marginBottom: "10px",
				}}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<button
						style={{ width: 200, marginBottom: 20 }}
						onClick={() => navigate("/create-game")}>
						Create Game
					</button>
					<Input
						placeholder="Search for a game..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)} // Update search term
						style={{ width: 200, marginBottom: 20,border:'1px solid black' }}
					/>
				</div>
				<Table
					columns={columns}
					dataSource={data.filter((game) =>
						Object.values(game).some(
							(value) =>
								typeof value === "string" &&
								value.toLowerCase().includes(searchTerm.toLowerCase())
						)
					)}
					pagination={pagination}
				/>
			</div>
		</div>
	);
};

export default GameList;
