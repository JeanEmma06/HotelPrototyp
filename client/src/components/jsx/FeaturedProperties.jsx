import useFetch from "../../hooks/useFetch";
import "../css/featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">À partir de ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="fpStar">&#9733;</span>
                ))}
                <span className="fpRatingText">Excellent</span>
              </div>}
              <button className="fpButton">Réserver maintenant</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;