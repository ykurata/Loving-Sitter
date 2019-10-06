import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const LoginUser = (email, password) => {
    
    const data = {
        email: email,
        password: password
    }

    axios.post('/users/login', data)
    .then(res => {
        const { token } = res.data;
        const decoded = jwt_decode(token);
        // localStorage.setItem('jwtToken', res.data);
        console.log(res.data);
        console.log(decoded);
    })
    .catch(err => {
        console.log(err.response.data.error);
    });
}
