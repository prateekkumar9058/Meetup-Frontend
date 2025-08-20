import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const searchHandler = (event) => {
    setQuery(event.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        const formattedQuery = query.charAt(0).toUpperCase() + query.slice(1);
        navigate(`/searchResults/${formattedQuery}`);
      }
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
              <input
                onChange={searchHandler}
                style={{
                  width: "220px",
                  border: "none",
                }}
                onKeyDown={keyDownHandler}
                className="form-control py-2 text-secondary"
                type="text"
                value={query}
                placeholder="Search by title and tags"
              />
            </div>
          </div>
        </nav>
        <hr />
      </header>
    </>
  );
};

export default Header;
