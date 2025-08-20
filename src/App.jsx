import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");
  const { data, error, loading } = useFetch(
    `https://meetup-backend-pi.vercel.app/events`
  );
  const [eventType, setEventType] = useState("All");

  const filterHandler = (e) => {
    setEventType(e.target.value);
  };

  const getEvents =
    data && eventType !== "All"
      ? data.filter((event) => event.eventMode === eventType)
      : data;

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className="container bg-light py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <h1 className="mb-2">Meetup Events</h1>
          <select
            onChange={filterHandler}
            className="form-select w-auto"
            id="eventType"
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
          <div className="row">
            {getEvents.map((event) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4" key={event.title}>
                <Link
                  to={`/eventDetails/${event.title}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="position-relative rounded overflow-hidden ratio ratio-16x9">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="img-fluid object-fit-cover w-100 h-100"
                    />
                    <span
                      className="position-absolute top-0 start-0 bg-white text-dark px-2 py-1 m-2 rounded small fw-semibold shadow-sm"
                      style={{ width: "auto", height: "auto" }} // 👈 ye ensure karega tag stretch na ho
                    >
                      {event.eventMode} Event
                    </span>
                  </div>

                  <p className="mb-1 text-secondary mt-2">{event.startDate}</p>
                  <h5 className="fs-5">{event.title}</h5>
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
