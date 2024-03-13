import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Context
import { useAuth } from '../../context/AuthContext';

// Styles
import './Login.css';

// Prepare Elements
export default function Login() {
    // Set Form Vars
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
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
            const response = await axios.post('http://localhost:3001/login', formData);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            navigate('/catalogue');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Credenciales inválidas. Inténtelo de nuevo.');
            } else {
                setError('Error al iniciar sesión. Inténtelo de nuevo más tarde.');
            }
            console.error('Error al iniciar sesión:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/catalogue');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="px-4 py-3 my-3 text-center" style={{height: 20 + 'vh'}}>
                        <h1 className="display-5 fw-bold text-body-emphasis">RealTest</h1>
                    </div>
                    <div className="album py-5 bg-body-tertiary" style={{height: 76 + 'vh'}}>
                        <div className="container">
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='form-group'>
                                            <label htmlFor="username">Usuario:</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="password">Contraseña:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className='form-control'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            { error && <div className="alert alert-danger" role="alert">{ error }</div> }
                                        </div>
                                        <div className='form-group'>
                                            <hr />
                                            <button type="submit" className='btn btn-primary'>Iniciar sesión</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-md-4'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


