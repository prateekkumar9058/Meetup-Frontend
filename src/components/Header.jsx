import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query") || "";
    setQuery(q);
  }, [location]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const formattedQuery = query.charAt(0).toUpperCase() + query.slice(1);
      navigate(`/searchResults?query=${encodeURIComponent(formattedQuery)}`);
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
                  onChange={(e) => setQuery(e.target.value)}
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
