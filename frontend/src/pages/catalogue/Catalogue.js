// Main Components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Context
import { useAuth } from '../../context/AuthContext';

// Styles
import './Catalogue.css';

// Supplement Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Prepare Elements
export default function Catalogue() {
    // Set Form Vars
    const { isLoggedIn } = useAuth();
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        fetch('http://localhost:3001/properties')
            .then(response => response.json())
            .then(data => {
                setProperties(data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);
    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className="px-4 py-3 my-3 text-center">
                        <h1 className="display-5 fw-bold text-body-emphasis">Catalogo</h1>
                    </div>
                    <div className="album py-5 bg-body-tertiary">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                {properties.map((property, index) => {
                                    return (
                                        <div className="col-lg-4 d-flex align-items-stretch" key={index}>
                                            <div className="card shadow-sm">
                                                <img className="card-img-top" src={`../assets/img/properties/${property.images[0]}`} alt={property.title} loading="lazy" style={{height: 30 + 'vh'}}/>
                                                <div className="card-body">
                                                    <p className="card-text" style={{height: 12 + 'vh'}}>{property.description}</p>
                                                    <hr />
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group">
                                                            <Link to={{pathname:`/property/${property.id}`}} state={{ property }}>
                                                                <button className="btn btn-sm btn-outline-secondary">Ver detalle</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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