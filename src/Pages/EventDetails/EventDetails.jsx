import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import UseAuth from "../../Hooks/UseAuth";


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const {user} = UseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/events.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(ev => ev._id === id);
        setEvent(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  const hundleNavigate = () => {
    if(!user){
      navigate('/login', {
        state: { from: `/events/${id}` }
      })
    } else{
      navigate('/eventregister', {
        state: { event }
      })
    }
  }

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <img
            src={event.image}
            alt={event.title}
            className="rounded-lg w-full h-80 object-cover shadow-md"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-base-content/70 mb-2"><strong>Category:</strong> {event.category}</p>
            <p className="text-base-content/70 mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-base-content/70 mb-2"><strong>Location:</strong> {event.location}</p>
            <p className="text-base-content/70 mb-2"><strong>Seats Available:</strong> {event.seats}</p>
            <p className="text-base-content/70 mb-2"><strong>Organizer:</strong> {event.organizer}</p>
            <p className="text-base-content/70 mb-2"><strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}</p>
            <p className="text-base-content/70 mb-4"><strong>Registration Fee:</strong> ৳{event.registrationFee}</p>

            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-base-content/80">{event.description}</p>
          </div>

          <Link state={{ event }}><button onClick={hundleNavigate} className="btn btn-primary mt-6 w-full lg:w-1/2">
            Register Now
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
