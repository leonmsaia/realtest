// Main Components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Context
import { useAuth } from '../../context/AuthContext';

// Styles
import './Register.css';

// Prepare Elements
export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar la solicitud al backend Node.js
            const response = await axios.post('http://localhost:3001/register', formData);
            console.log(response.data.message); // Mensaje de confirmación del backend
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        LOGO
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <div className='row'>
                            <div className='col-md-12'><h3>Crear Cuenta</h3></div>
                            <div className='col-md-12'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='form-control'
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className='form-control'
                                        />
                                    </div>
                                    <button type="submit" className='btn btn-primary'>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        </>
    )
}