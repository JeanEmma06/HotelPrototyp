import "./list.css";
import Navbar from "../../components/jsx/Navbar";
import Header from "../../components/jsx/Header";
import Loading from "../../components/jsx/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/jsx/SearchItem";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const { data, loading } = useFetch(`/rooms?min=${min || 0 }&max=${max || 999}`);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: {  dates, options } });
    navigate("/rooms", { state: {  dates, options } });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Recherche</h1>
            
            <div className="lsItem">
              <label>Dates</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} à ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Minimum <small>par nuit</small>
                  </span>
                  <input
                    type="number"
                    min={0}
                    pattern="[0-9]{0,5}"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Maximum <small>par nuit</small>
                  </span>
                  <input
                    type="number"
                    min={0}
                    pattern="[0-9]{0,5}"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adultes</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Enfants</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Chambres</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Rechercher</button>
          </div>
          <div className="listResult">
            {loading ? (
              <Loading />
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List; 