import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/GameForm.css";
const GameForm = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = (values) => {
		const games = JSON.parse(localStorage.getItem("games")) || [];
		games.push(values);
		localStorage.setItem("games", JSON.stringify(games));
		form.resetFields();
	};

	return (
		<div className="game-form-container">
				<button
					className="top-right-button"
					onClick={() => navigate("/list")}>
					Go to List
				</button>
			{/* </div> */}
			<h2>Create Game</h2>
			<Form
				form={form}
				name="gameForm"
				onFinish={onFinish}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}>
				<Form.Item
					className="form-group"
					name="name"
					label="Name"
					rules={[
						{ required: true, message: "Please enter the game's name!" },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					className="form-group"
					name="url"
					label="URL"
					rules={[
						{ required: true, message: "Please enter the game's URL!" },
						{
							type: "url",
							message: "Please enter a valid URL!",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					className="form-group"
					name="author"
					label="Author"
					rules={[
						{ required: true, message: "Please enter the author's name!" },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					className="form-group"
					name="published_date"
					label="Published Date"
					rules={[
						{ required: true, message: "Please select the published date!" },
					]}>
					<DatePicker
						showTime
						format="YYYY-MM-DD HH:mm:ss"
						placeholder="Select Date and Time"
						style={{ width: "100%" }}
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<button htmlType="submit">Create</button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default GameForm;
