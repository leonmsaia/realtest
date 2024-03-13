// Main Components
import React, { useState, useEffect } from 'react';
import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

// Context
import { useAuth } from '../../context/AuthContext';

// Styles
import './Item.css';

// Supplement Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Prepare Elements
export default function Item() {
    // Set Form Vars
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    const property = useLocation().state.property;
    const [emailData, setEmailData] = useState({
        to: 'leonmsaia@gmail.com',
        from: '',
        phone: '',
        mail: '',
        text: ''
    });

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isDanger, setIsDanger] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleChange = e => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/send-email', {
                to: emailData.to,
                subject: `Interesado en: ${property.title}`,
                text: `
                    De: ${emailData.from}
                    Telefono: ${emailData.phone}
                    E-Mail: ${emailData.mail}
                    Consulta: ${emailData.text}
                `
            });
            setIsSuccess(true);
            setIsButtonDisabled(true);
        } catch (error) {
            setIsDanger(true);
            setIsButtonDisabled(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className="px-4 py-3 my-3 text-center">
                        <h1 className="display-5 fw-bold text-body-emphasis">Catalogo: {property.title}</h1>
                    </div>
                    <div className="album py-5 bg-body-tertiary">
                        <div className="container">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <img src={`../assets/img/properties/${property.images[0]}`} className="img-fluid" alt={property.title} loading="lazy"/>
                                        </div>
                                        <div className='col-md-12'>
                                            <hr />
                                            <h3>Contacta al Anunciante</h3>
                                            <form onSubmit={ handleSubmit }>
                                                <div className='form-group'>
                                                    <label htmlFor="username">Nombre y Apellido:</label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        className='form-control'
                                                        name="from"
                                                        value={emailData.from}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="username">E-Mail:</label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        className='form-control'
                                                        name="mail"
                                                        value={emailData.mail}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="username">Telefono:</label>
                                                    <input
                                                        type="text"
                                                        id="username"
                                                        className='form-control'
                                                        name="phone"
                                                        value={emailData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="username">Consulta:</label>
                                                    <textarea name="text"
                                                        value={emailData.text}
                                                        onChange={handleChange}
                                                        placeholder=""
                                                        className='form-control'
                                                        required
                                                        rows={4}
                                                        cols={40}
                                                    />
                                                </div>
                                                <div className='form-group'>
                                                    <small style={{color: 'red'}}><b>Todos los campos son obligatorios.</b></small>
                                                    <br />
                                                    <button type="submit" className='btn btn-sm btn-outline-secondary' disabled={ isButtonDisabled }>Enviar Consulta</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className='col-md-12'>
                                            { isSuccess && <div className="alert alert-success" role="alert">Mensaje enviado correctamente, sera contactado a la brevedad.</div> }
                                            { isDanger && <div className="alert alert-danger" role="alert">Hubo un error al enviar el mensaje, intente nuevamente.</div> }
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h4>Caracteristicas</h4>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <p>" <i>{property.description}"</i></p>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h6 className="mb-0">Habitaciones: <b>{property.num_rooms}</b></h6>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h6 className="mb-0">Baños: <b>{property.num_bathrooms}</b></h6>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h6 className="mb-0">Superficie: <b>{property.area} m/2</b></h6>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h6 className="mb-0">Tipo de Propiedad: <b>{property.property_type}</b></h6>
                                                    </div>
                                                </div>
                                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <h6 className="mb-0">Precio: <b>USD {property.price}</b></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <hr />
                                            <Link to={{pathname:'/catalogue/'}}>
                                                <button className="btn btn-sm btn-outline-secondary">Volver</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Footer />
            </div>
        </>
    )
}