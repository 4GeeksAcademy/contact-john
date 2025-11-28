import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cards } from "../components/Cards.jsx";


export const Home = () => {

	const API_URL = "https://playground.4geeks.com/contact";
    const nombreUsuario = "prueba7";
    const [agenda, setAgenda] = useState([]);

    const {store} = useGlobalReducer()

    const Usuario = () => {
        fetch(`${API_URL}/users/${nombreUsuario}`)
            .then(response => {
                if (response.status === 200) {
                    cargarAgenda();
                    return;
                }

                if (response.status === 404) {
                    return fetch(`${API_URL}/agendas/${nombreUsuario}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: nombreUsuario })
                    })
                    .then(() => cargarAgenda());
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        Usuario();
    }, []);

    const cargarAgenda = () => {
    fetch(`${API_URL}/agendas/${nombreUsuario}/contacts`)
        .then(response => response.json())
        .then(data => {
            const contacts = data.contacts || [];
            setAgenda(contacts);
        })
        .catch(error => console.log(error));
};

    return (
     <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Contacts</h1>
        </div>
            <div className="row">
     {agenda.map((item, index) => {
    return (
        <Cards
            key={index}
            name={item.name}
            number={item.phone}
            email={item.email}
            phone={item.phone}
            address={item.address}
        />
    );
})}
            </div>
    </div>
    );
}; 