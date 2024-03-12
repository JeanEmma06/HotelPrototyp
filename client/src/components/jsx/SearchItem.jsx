import { Link } from "react-router-dom";
import "../css/searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Annulation gratuite </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.price}</span>
          <Link to={`/rooms/${item._id}`}>
          <button className="siCheckButton">Voir la disponibilité</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
