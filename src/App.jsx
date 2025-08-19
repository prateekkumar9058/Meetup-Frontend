import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
function App() {
  const { data, error, loading } = useFetch(
    `https://meetup-backend-pi.vercel.app/events`
  );
  const [eventType, setEventType] = useState("All");

  const { query } = Header;
  console.log(query);

  const filterHandler = (e) => {
    setEventType(e.target.value);
  };

  let getEvents;
  if (data && eventType !== "All") {
    getEvents = data.filter((event) => event.eventMode === eventType);
  } else {
    getEvents = data;
  }
  console.log(getEvents);

  return (
    <>
      <Header />
      <main className="container bg-light">
        <h1 style={{ display: "inline" }}>Meetup Events</h1>
        <div className="float-end">
          <select
            onChange={filterHandler}
            className="form-group py-2 text-secondary text-center"
            style={{
              width: "190px",
              border: "none",
            }}
            id="eventTye"
          >
            <option value="All">Select Event Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both Offline and Online">Both</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error occurred while fetching the data</p>
        ) : data && data.length !== 0 ? (
          <div className="row my-3">
            {getEvents.map((event) => (
              <div className="col-md-4 my-3" key={event.title}>
                <Link to={`/eventDetails/${event.title}`}>
                  <div
                    style={{
                      width: "330px",
                      height: "200px",
                    }}
                  >
                    <img
                      src={event.imageUrl}
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </Link>
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
}

export default App;
