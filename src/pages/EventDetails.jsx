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
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <h2>{data.title}</h2>
              <p className="mt-3 mb-0">Hosted By:</p>
              <strong>{data.hostName}</strong>
              <br />
              <img
                width="600px"
                className="img-fluid mt-4 mb-2"
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
              {data.tags.map((tag) => (
                <p
                  style={{
                    display: "inline",
                    marginRight: "10px",
                    color: "white",
                    background: "rgb(239 66 0)",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  {tag}
                </p>
              ))}
            </div>
            <div
              className="mt-2"
              style={{
                width: "35%",
              }}
            >
              <div className="row container py-3 mb-3 bg-white">
                <div className=" text-secondary col-md-1 mt-2">
                  <FaClock />
                </div>
                <div className="col-md-11">
                  {data.startDate} to <br />
                  {data.endDate}
                </div>
                <div className=" text-secondary col-md-1 mt-3">
                  <FaMapMarkerAlt />
                </div>
                <div className="col-md-11 mt-3">{data.address}</div>
                <div className=" text-secondary col-md-1 mt-3">
                  <FaRupeeSign />
                </div>
                <div className="col-md-11 mt-3">{data.price}</div>
              </div>
              <h4 className="mt-5">Speakers({data.speakers.length}):</h4>
              <div className="row mt-3">
                {data.speakers.map((speaker) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      gap: "3rem",
                      marginRight: "30px",
                    }}
                    className="col-md-5 py-2"
                  >
                    <div
                      style={{
                        display: "ruby",
                      }}
                      className="text-center"
                    >
                      <div
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
              <div className="text-center mt-5">
                <button
                  style={{
                    color: "white",
                    background: "rgb(239 66 0)",
                    borderColor: "rgb(239 66 0)",
                    padding: "8px",
                    borderRadius: "6px",
                    width: "170px",
                    fontSize: "small",
                    fontWeight: "600",
                    fontFamily: "sans-serif",
                  }}
                >
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
