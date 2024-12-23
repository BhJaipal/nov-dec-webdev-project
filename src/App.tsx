import { BrowserRouter, Route, Routes } from 'react-router'
import AboutMe from './routes/about-me'
import './App.css'
import Header from './components/header'
import Home from './routes/home'
import TodoList from './routes/todo-list'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/todo-list' element={<TodoList />} />
				<Route path='/about-me' element={<AboutMe />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
