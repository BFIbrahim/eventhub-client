import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";

const AddEvent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const axios = useAxios()

    const onSubmit = (data) => {
        console.log("Collected Event Data:", data);
        const eventData = {
            title: data.title,
            date: data.date,
            location: data.location,
            category: data.category,
            organizer: data.organizer,
            seats: parseInt(data.seats),
            registrationFee: parseFloat(data.registrationFee),
            image: data.image,
            description: data.description
        }

        axios.post('/events', eventData)
        .then(res => {
            console.log('Event Added Successfull', res.data)
            alert('Event Added Successfull')
        })
        .catch(error => {
            console.log("Error:", error.message);
        })

    };

    return (
        <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Event</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="md:col-span-2">
                    <input
                        type="text"
                        placeholder="Event Title"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <input
                    type="date"
                    {...register("date", { required: "Event date is required" })}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Location"
                    {...register("location", { required: "Location is required" })}
                    className="input input-bordered w-full"
                />

                <select
                    {...register("category", { required: "Category is required" })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Category</option>
                    <option>Music</option>
                    <option>Tech</option>
                    <option>Business</option>
                    <option>Sports</option>
                    <option>Education</option>
                </select>

                <input
                    type="text"
                    placeholder="Organizer Name"
                    {...register("organizer", { required: "Organizer name is required" })}
                    className="input input-bordered w-full"
                />

                <input
                    type="number"
                    placeholder="Available Seats"
                    {...register("seats", {
                        required: "Seats are required",
                        min: 1
                    })}
                    className="input input-bordered w-full"
                />

                <input
                    type="number"
                    placeholder="Registration Fee (৳)"
                    {...register("registrationFee", {
                        required: "Registration fee required",
                        min: 0
                    })}
                    className="input input-bordered w-full"
                />

                <div className="md:col-span-2">
                    <input
                        type="text"
                        placeholder="Event Image URL"
                        {...register("image", { required: "Image URL is required" })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <textarea
                        placeholder="Event Description"
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full h-32"
                    />
                </div>

                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary w-full">
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;
