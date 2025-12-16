import { useState } from "react";
import { FaStar } from "react-icons/fa";

const MyBookings = () => {
  // temporary dummy bookings (later backend থেকে আসবে)
  const [bookings, setBookings] = useState([
    {
      _id: "1",
      title: "Tech Meetup Night",
      date: "2025-08-05",
      tickets: 2
    },
    {
      _id: "2",
      title: "Music Festival",
      date: "2025-08-10",
      tickets: 1
    }
  ]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleCancel = (id) => {
    console.log("Cancel booking:", id);
    // later cancel booking logic
  };

  const handleReviewSubmit = (id) => {
    console.log("Review for booking:", id, { rating, comment });
    setRating(0);
    setComment("");
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
              {/* Booking Info */}
              <div>
                <h3 className="text-xl font-semibold">{booking.title}</h3>
                <p className="text-sm text-gray-600">
                  Date: {booking.date}
                </p>
                <p className="text-sm text-gray-600">
                  Tickets: {booking.tickets}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Review Button */}
                <label
                  htmlFor={`review-modal-${booking._id}`}
                  className="btn btn-outline btn-sm"
                >
                  Add Review
                </label>

                {/* Cancel Button */}
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn btn-error btn-sm"
                >
                  Cancel Booking
                </button>
              </div>

              {/* Review Modal */}
              <input
                type="checkbox"
                id={`review-modal-${booking._id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-3">
                    Review: {booking.title}
                  </h3>

                  {/* Rating */}
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

                  {/* Comment */}
                  <textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="textarea textarea-bordered w-full"
                  />

                  <div className="modal-action">
                    <label
                      htmlFor={`review-modal-${booking._id}`}
                      className="btn btn-primary"
                      onClick={() => handleReviewSubmit(booking._id)}
                    >
                      Submit Review
                    </label>
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
