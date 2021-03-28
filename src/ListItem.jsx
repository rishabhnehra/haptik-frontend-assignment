import './ListItem.scss';
export const ListItem = ({ name, isFavourite, handleDelete, handleFavourite }) => (
    <li className="list-item">
        <div className="name">
            <h4>{name}</h4>
            <p>is your friend</p>
        </div>
        <div className="action-items">
            <button className="fav" onClick={handleFavourite}>{isFavourite ? `★` : `✩`}</button>
            <button className="del" onClick={handleDelete}>🗑 </button>
        </div>
    </li>
);