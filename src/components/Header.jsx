import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let [query, setQuery] = useState("");
  const [otherQuery, setOtherQuery] = useState("");
  const location = useLocation();

  const changeHandler = (e) => {
    setQuery(e.target.value);
    setOtherQuery();
    console.log(
      window.location.href.slice(0, 41) ===
        `http://localhost:5173/searchResults?query`,
      query.length
    );
    if (
      window.location.href.slice(0, 41) ==
        `http://localhost:5173/searchResults?query` &&
      query.length == 1
    ) {
      navigate(`/searchResults?query=`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let q = params.get("query") || "";
    setQuery(q);
  }, [location]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/searchResults?query=${encodeURIComponent(query)}`);
    }
  };

  const style = {
    fontFamily: "'Pacifico', cursive",
    fontSize: "35px",
    color: "#FF385C",
    display: "inline",
  };

  const searchStyle = {
    position: "absolute",
    right: "134px",
    bottom: "595px",
    width: "20px",
    color: "grey",
  };

  return (
    <>
      <header className="mt-3">
        <nav className="navbar navbar-expand-lg">
          <div className="container mb-4">
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to="/"
            >
              <h2 style={style}>Meetup</h2>
            </NavLink>
            <img
              style={searchStyle}
              src="https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=000000"
              alt=""
            />
            <div className="float-end py-2 text-secondary">
              <form onSubmit={searchHandler}>
                <input
                  onChange={changeHandler}
                  style={{
                    width: "220px",
                    border: "none",
                  }}
                  className="form-control py-2 text-secondary"
                  type="text"
                  value={query}
                  placeholder="Search by title and tags"
                />
              </form>
            </div>
          </div>
        </nav>
        <hr />
      </header>
    </>
  );
};

export default Header;
