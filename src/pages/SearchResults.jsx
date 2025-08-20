import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { data, loading } = useFetch(
    `https://meetup-backend-pi.vercel.app/events/`
  );

  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  let getEvents;
  let searchQuery1 = query.charAt(0).toUpperCase() + query.slice(1);
  let searchQuery2 = query.charAt(0).toLowerCase() + query.slice(1);

  if (data) {
    getEvents = data.reduce((arr, curr) => {
      (curr.title.includes(searchQuery1) ||
        curr.title.includes(searchQuery2)) &&
        arr.push(curr);
      return arr;
    }, []);
  }

  return (
    <>
      <Header />
      <main className="container py-4">
        {loading ? (
          <p>Loading</p>
        ) : getEvents && getEvents.length != 0 ? (
          <div className="row my-3">
            <h2>Your search results:</h2>
            {getEvents.map((event) => (
              <div className="col-md-4 my-3">
                <div className="card">
                  <Link to={`/eventDetails/${event.title}`}>
                    <img
                      src={event.imageUrl}
                      height="200px"
                      className="card-img"
                      alt="..."
                    />
                  </Link>
                </div>
                <p className="mb-1 text-secondary">{event.startDate}</p>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`/eventDetails/${event.title}`}
                >
                  <h5>{event.title}</h5>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Data not found</p>
        )}
      </main>
    </>
  );
};

export default SearchResults;
