import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { useLocation } from "react-router";
import useAxios from "../../Hooks/useAxios";


const EventRegistration = () => {
    const location = useLocation();
    const { event } = location.state || {};

    const axios = useAxios()

    console.log(event)

    const { user } = UseAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Registration Data:", data);

        const registrationData = {
            userEmail: user?.email,
            eventId: event._id,  
            event,               
            name: data.name,
            phone: data.phone,
            tickets: data.tickets,
            paymentMethod: data.paymentMethod || ""
        };


        axios.post('/registeredEvents', registrationData)
            .then(res => {
                console.log("Registered Event:", res.data)
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('Registration Error:', error.message);
                alert('Error registering event');
            })
    };

    return (
        <div className="max-w-xl mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register for: {event.title}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    readOnly
                    type="text"
                    placeholder="Name"
                    defaultValue={user?.displayName || ""}
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                <input
                    readOnly
                    type="email"
                    placeholder="Email"
                    defaultValue={user?.email || ""}
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", { required: "Phone number is required" })}
                    className="input input-bordered w-full"
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

                <input
                    type="number"
                    placeholder="Number of Tickets"
                    {...register("tickets", { required: "Please enter number of tickets", min: 1 })}
                    className="input input-bordered w-full"
                />
                {errors.tickets && <span className="text-red-500 text-sm">{errors.tickets.message}</span>}

                <input
                    type="text"
                    placeholder="Payment Method (Optional)"
                    {...register("paymentMethod")}
                    className="input input-bordered w-full"
                />

                <button type="submit" className="btn btn-primary w-full mt-4">
                    Register Now
                </button>
            </form>
        </div>
    );
};

export default EventRegistration;
