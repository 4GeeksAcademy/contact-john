import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact";
const nombreUsuario = "prueba7";

export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");

    const crearContacto = () => {
        if (!nombre.trim()) {
            alert("El nombre es obligatorio");
            return;
        }

        fetch(`${API_URL}/agendas/${nombreUsuario}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nombre,
                phone: telefono,
                email: email,
                address: direccion,
            })
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log("Contacto creado:", data);
                setNombre("");
                setTelefono("");
                setEmail("");
                setDireccion("");
            })
            .catch(error => {
                console.error(error);
                alert("Error al crear el contacto");
            });
    };
    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-5">Add a new contact</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Phone"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary form-control"
                        onClick={crearContacto}
                    >
                        Save
                    </button>
                    <Link to="/">
                        <button type="button" className="btn btn-secondary form-control mt-3">
                            Back to contacts
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
