  import useFetch from "../../hooks/useFetch";
  import "../css/featured.css";

  const Featured = () => {
    const { data, loading } = useFetch(
      "/hotels/countByCity?cities=Abidjan,Abuja,Dakar"
    );

    return (
      <div className="featured">
        {loading ? (
          <div className="loading">Chargement, veuillez patienter...</div>
        ) : (
          <>
            <a href="/" className="featuredItem">
              <img
                src="https://hospitality-on.com/sites/default/files/import/product/Abidjan__2_.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Abidjan</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </a>

            <a href="/" className="featuredItem">
              <img
                src="https://content.r9cdn.net/rimg/dimg/fa/16/ede0b51a-city-28457-17e257d44c3.jpg?width=1366&height=768&xhint=1026&yhint=1173&crop=true"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Dakar</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </a>

            <a href="/" className="featuredItem">
              <img
                src="https://www.tresorsdumonde.fr/wp-content/uploads/2016/11/Abuja1.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Abuja</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </a>
          </>
        )}
      </div>
    );
  };

  export default Featured;