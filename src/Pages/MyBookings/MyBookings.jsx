import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import UseAuth from "../../Hooks/UseAuth";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const axios = useAxios();
  const { user } = UseAuth();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/registeredEvents?email=${user.email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.log(err.message));
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await axios.delete(`/registeredEvents/${id}`);
      alert(res.data.message);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking");
    }
  };

  const handleReviewSubmit = async (booking) => {
    if (rating === 0 || comment.trim() === "") {
      return alert("Please provide rating and comment");
    }

    const reviewData = {
      bookingId: booking._id,
      eventId: booking.event._id,
      userEmail: user.email,
      userName: user.displayName,
      rating,
      comment,
    };

    try {
      const res = await axios.post("/reviews", reviewData);
      alert(res.data.message);
      setRating(0);
      setComment("");
      document.getElementById(`review-modal-${booking._id}`).checked = false;
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {console.log(booking._id)}
              <div>
                <h3 className="text-xl font-semibold">{booking.event.title}</h3>
                <p className="text-sm text-gray-600">Date: {booking.event.date}</p>
                <p className="text-sm text-gray-600">Tickets: {booking.tickets}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <label
                  htmlFor={`review-modal-${booking._id}`}
                  className="btn btn-outline btn-sm"
                >
                  Add Review
                </label>

                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn btn-error btn-sm"
                >
                  Cancel Booking
                </button>
              </div>

              <input
                type="checkbox"
                id={`review-modal-${booking._id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor={`review-modal-${booking._id}`}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    close
                  </label>
                  <h3 className="font-bold text-lg mb-3">
                    Review: {booking.event.title}
                  </h3>

                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>

                  <textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="textarea textarea-bordered w-full"
                  />

                  <div className="modal-action">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReviewSubmit(booking)}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
