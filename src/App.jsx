import { useState } from 'react';
import { ListItem } from './ListItem';
import './App.scss';

function App() {
	const [list, setList] = useState([]);
	const [friendName, setFriendName] = useState("");
	const [currentPagination, setCurrentPagination] = useState(1);
	const paginationPages = (Math.ceil(list.length/4) <= 0) ? 1 : Math.ceil(list.length/4);

	const handleChange = (e) => {
		setFriendName(e.target.value);
	}

	const handleDelete = (name) => {
		let result = window.confirm(`Are you sure you want to delete ${name} fron friend's list ?`)
		if (result){
			list.splice(list.findIndex(item => item.name === name), 1);
			setList([...list]);
		}
	}

	const handleFavourite = (name) => {
		const friend = list.find(item => item.name === name);
		friend.isFavourite = !friend.isFavourite;
		setList([...list])
	}

	const handlePagination = (direction) => {
		if (direction === "left") {
			if (currentPagination - 1 >= 1)
				setCurrentPagination(currentPagination - 1);
		}
		else {
			if(currentPagination + 1 <= paginationPages) 
				setCurrentPagination(currentPagination + 1);
		}
	}

	const listPaginationItems = () => {
		const start = (currentPagination - 1) * 4;
		const selectedItems = list.slice(start, start + 4);
		return selectedItems.map((item, index) => <ListItem
			key={index}
			name={item.name}
			isFavourite={item.isFavourite}
			handleDelete={() => handleDelete(item.name)}
			handleFavourite={() => handleFavourite(item.name)}
		/>);
	}

	const handleSubmit = (e) => {
		if (friendName.length > 0) {
			setList([...list, {
				name: friendName,
				isFavourite: false
			}]);
			setFriendName("");
		}
		e.preventDefault();
	}

	return (
		<div className="App">
			<h2>Friend List</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" className="input-friend" onChange={handleChange} placeholder="Enter your firend's name" value={friendName} />
				<input type="submit" />
			</form>
			<ul className="firend-list">
				{listPaginationItems()}
			</ul>
			<div className="pagination">
				<button className="left" onClick={() => handlePagination("left")}>&lt;</button>
				<p>{`${currentPagination} / ${paginationPages}`}</p>
				<button className="right" onClick={() => handlePagination("right")}>&gt;</button>
			</div>
		</div>
	);
}

export default App;
