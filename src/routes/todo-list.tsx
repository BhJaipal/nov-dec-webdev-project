import { useEffect, useState } from "react";
import "./todo-list.css"
import Model from "../components/model";

export default function Home() {
	const [task, setTask] = useState("");
	const [btnClicked, setBtnClicked] = useState(false);
	const [todos, setTodos] = useState<{ task: string, id: number, isCompleted: boolean }[]>([]);
	const [id, setId] = useState(0);
	const [showSelect, setShowSelect] = useState(false);
	const [filter, setFilter] = useState("all");

	const [draggerId, setDraggerId] = useState(-1);
	const [dragStart, setDragStart] = useState(false);
	const [modelShow, setModelShow] = useState(false);
	const [editingTodo, setEditingTodo] = useState<undefined | typeof todos[0]>(undefined);

	useEffect(() => {
		document.body.classList.remove("light", "grey-1", "grey-2", "grey-3", "grey-4", "grey-5",
			"grey-1-5", "grey-2-5", "grey-3-5", "grey-4-5", "grey-5-5");
	}, []);

	const handleComplete = (id: number) => {
		const todosCopy = [];
		for (const todo of todos) {
			if (todo.id === id)
				todo.isCompleted = !todo.isCompleted;
			todosCopy.push(todo);
		}
		setTodos(todosCopy);
	}

	const handleDelete = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	}

	const handleEdit = (id: number) => {
		const todo = todos.find((todo) => todo.id === id);
		setEditingTodo(todo);
		setModelShow(true);
	}

	const handleDrag = (id: number) => {
		if (dragStart) return;
		setDragStart(true);
		setDraggerId(id);
	}
	const handleDrop = (id: number) => {
		if (draggerId == id || draggerId == -1 || !dragStart) return;

		setDragStart(false);
		let todoCopy: { task: string, id: number, isCompleted: boolean }[] = [];
		todoCopy = [...todos];

		const todo = todoCopy[id];
		todo.id = draggerId;

		todoCopy[id] = todos[draggerId];
		todoCopy[draggerId].id = id;

		todoCopy[draggerId] = todo;

		setTodos(todoCopy);
		setDraggerId(-1);
	}

	const handleEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") {
			setModelShow(false);
			if (editingTodo) {
				setTodos(todos.map((todo) => {
					if (todo.id === editingTodo.id)
						return editingTodo;
					return todo;
				}))
			}
		}
	}

	const addTodo = () => {
		if (!task.trim())
			setBtnClicked(true);
		else {
			setTodos([...todos, { task, id, isCompleted: false }]);
			setId(id + 1);
			setTask("");
		}
	}
	return (
		<>
			<Model show={modelShow}>
				<div className="new-name">
					<label htmlFor="new-name-input">
						<input value={editingTodo?.task || ""}
							onChange={(e) => setEditingTodo({
								isCompleted: (editingTodo ? editingTodo.isCompleted : false),
								id: (editingTodo ? editingTodo.id : 0), task: e.target.value
							})}
							id="new-name-input"
							onKeyDown={(e) => handleEditTodo(e)}
						/>
						<kbd onClick={() => {
							setModelShow(false);
							if (editingTodo) {
								setTodos(todos.map((todo) => {
									if (todo.id === editingTodo.id)
										return editingTodo;
									return todo;
								}))
							}
						}}>↵</kbd>
					</label>
					<div>
						<button onClick={() => {
							setModelShow(false);
							if (editingTodo) {
								setTodos(todos.map((todo) => {
									if (todo.id === editingTodo.id)
										return editingTodo;
									return todo;
								}))
							}
						}}>Save</button>
					</div>
				</div>
			</Model>
			<main className="todo-page">
				<h1>To-Do List</h1>
				<div className="todo-input">
					<input
						type="text"
						value={task}
						disabled={modelShow}
						onChange={(e) => { setTask(e.target.value); }}
						onKeyDown={(e) => { if (e.key === "Enter") addTodo() }}
						aria-label="Add a task"
						placeholder={btnClicked && !task.trim() ? "Please enter a task" : "Add a task"}
					/>
					<button onClick={addTodo} disabled={modelShow}><i className="material-icons">add</i></button>
				</div>
				<div className="todo-filter">
					<div className="filter" onClick={
						modelShow ? () => { } :
							(() => showSelect ? setShowSelect(false) : setShowSelect(true))}>
						<div>
							{filter[0].toUpperCase() + filter.slice(1)}
						</div>
						<div>
							<i className="material-icons">filter_list</i>
						</div>
					</div>
					{
						showSelect && !modelShow && <div className="select-opts">
							<div onClick={() => {
								setFilter("all");
								setShowSelect(false);
							}}>All</div>
							<div onClick={() => {
								setFilter("active");
								setShowSelect(false);
							}}>Active</div>
							<div onClick={() => {
								setFilter("completed");
								setShowSelect(false);
							}}>Completed</div>
						</div>
					}
				</div>
				<div id="todos">
					{todos.map((todo, i) => {
						if (filter == "all") {
							return (
								<div className={"todo" + (todo.isCompleted ? " checked" : "")} key={i} id={"todo-" + todo.id} draggable
									onDragStart={() => handleDrag(todo.id)}
									onDragOver={() => handleDrop(todo.id)}
								>
									<label className="todo-text" htmlFor={"check-" + todo.id}>{todo.task}</label>
									<input type="checkbox" id={"check-" + todo.id} className="todo-completion"
										onChange={() => handleComplete(todo.id)}
										disabled={modelShow} />
									<i className="material-icons"
										onClick={
											modelShow ? () => { } :
												() => handleComplete(todo.id)}>
										{todo.isCompleted ? "check" : "warning"}
									</i>
									<i className="material-icons todo-edit" onClick={
										modelShow ? () => { } :
											() => handleEdit(todo.id)}>edit</i>
									<input type="checkbox"
										onClick={() => handleDelete(todo.id)}
										disabled={modelShow} />
									<i className="material-icons todo-delete" onClick={
										modelShow ? () => { } :
											() => handleDelete(todo.id)}>delete</i>
								</div>
							)
						} else if (filter == "completed") {
							if (todo.isCompleted)
								return (
									<div className={"todo" + (todo.isCompleted ? " checked" : "")} key={i}>
										<label className="todo-text" htmlFor={"check-" + todo.id}>{todo.task}</label>
										<input type="checkbox" id={"check-" + todo.id} className="todo-completion"
											onChange={() => handleComplete(todo.id)} />
										disabled={modelShow}
										<i className="material-icons" onClick={
											modelShow ? () => { } :
												() => handleComplete(todo.id)}>check</i>
										<i className="material-icons todo-edit" onClick={
											modelShow ? () => { } :
												() => handleEdit(todo.id)}>edit</i>
										<input type="checkbox"
											onClick={() => handleDelete(todo.id)} />
										disabled={modelShow}
										<i className="material-icons todo-delete" onClick={
											modelShow ? () => { } :
												() => handleDelete(todo.id)}>delete</i>
									</div>
								)
						} else {
							if (!todo.isCompleted)
								return (
									<div className={"todo" + (todo.isCompleted ? " checked" : "")} key={i}>
										<label htmlFor={"check-" + todo.id} className="todo-text">{todo.task}</label>
										<input type="checkbox" id={"check-" + todo.id} className="todo-completion"
											disabled={modelShow}
											onChange={() => handleComplete(todo.id)} />
										<i className="material-icons" onClick={
											modelShow ? () => { } :
												() => handleComplete(todo.id)}>warning</i>
										<i className="material-icons todo-edit" onClick={
											modelShow ? () => { } :
												() => handleEdit(todo.id)}>edit</i>
										<input type="checkbox"
											disabled={modelShow}
											onClick={() => handleDelete(todo.id)} />
										<i className="material-icons todo-delete" onClick={
											modelShow ? () => { } :
												() => handleDelete(todo.id)}>delete</i>
									</div>
								)
						}
					})}
				</div>
			</main>
		</>
	);
}