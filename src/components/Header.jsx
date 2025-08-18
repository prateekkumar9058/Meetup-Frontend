import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("All");

  const searchHandler = (event) => {
    setQuery(event.target.value);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/searchResults/${query}`;
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
      <header className="container bg-light mt-3">
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
              placeholder="Search by title and tags"
            />
          </div>
        </div>
        <hr />
      </header>
    </>
  );
};

export default Header;
