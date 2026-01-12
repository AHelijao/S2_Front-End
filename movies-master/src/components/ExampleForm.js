import React, { useState } from "react";
import { movieApi } from "../constants/axios";
import { movieWishRequests } from "../constants/requests";


const ExampleForm = () => {
    const [user, movieWish] = useState({
        name: "",
        email: "",
        movieWish: "",
    });

    const handleChange = (e) => {
        movieWish({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        movieApi.post(movieWishRequests.register, user)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="movieWish"
                    value={user.movieWish}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default ExampleForm;
