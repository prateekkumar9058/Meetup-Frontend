import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const EventDetails = () => {
  const eventTitle = useParams();
  const { data, error, loading } = useFetch(
    `https://meetup-backend-pi.vercel.app/events/${eventTitle.eventName}`
  );
  console.log(data, eventTitle.eventName);
  return (
    <>
      <Header />
      <main className="container py-4">
        {error && <p>An error occured while fetching the events</p>}
        {loading ? (
          <p>Loading...</p>
        ) : data ? (
          <section className="row gy-4">
            {/* Left Column */}
            <div className="col-12 col-lg-7">
              <h2>{data.title}</h2>
              <p className="mt-3 mb-0">Hosted By:</p>
              <strong>{data.hostName}</strong>
              <img
                style={{
                  display: "block",
                }}
                className="img-fluid mt-4 mb-2 rounded"
                src={data.imageUrl}
                alt="img"
              />
              <h4>Details:</h4>
              <p className="my-3">{data.details}</p>
              <h4>Additional Information:</h4>
              <p>
                <strong>Dress code: </strong>
                {data.dressCode}
              </p>
              <p>
                <strong>Age Restrictions: </strong>
                {data.ageRestrictions}
              </p>
              <h4 className="my-3">Event Tags:</h4>
              <div className="d-flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded text-white fw-semibold"
                    style={{
                      backgroundColor: "rgb(239 66 0)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-12 col-lg-5">
              <div className="row g-3 bg-white p-3 rounded shadow-sm">
                <div className="col-1 text-secondary">
                  <FaClock />
                </div>
                <div className="col-11">
                  {data.startDate} to <br />
                  {data.endDate}
                </div>
                <div className="col-1 text-secondary">
                  <FaMapMarkerAlt />
                </div>
                <div className="col-11">{data.address}</div>
                <div className="col-1 text-secondary">
                  <FaRupeeSign />
                </div>
                <div className="col-11">{data.price}</div>
              </div>

              <h4 className="mt-5">Speakers ({data.speakers.length}):</h4>
              <div className="row g-3 mt-3">
                {data.speakers.map((speaker, index) => (
                  <div key={index} className="col-12 col-sm-6">
                    <div className="bg-white p-3 rounded text-center shadow-sm">
                      <div
                        className="mx-auto mb-2"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={speaker.imageUrl}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <h6 className="mb-0">{speaker.name}</h6>
                      <p className="mb-0">{speaker.department}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-danger fw-semibold px-4 py-2">
                  RSVP
                </button>
              </div>
            </div>
          </section>
        ) : (
          <p>Event not found</p>
        )}
      </main>
    </>
  );
};

export default EventDetails;
