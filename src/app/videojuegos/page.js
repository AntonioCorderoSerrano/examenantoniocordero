"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventoList() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchEventos();
    }, []);

    async function fetchEventos() {
        const response = await fetch("/api/article");
        const body = await response.json();
        console.log("Datos obtenidos del backend:", body);  
        if (Array.isArray(body)) {
            setEventos(body);
        } else {
            console.error("Los datos obtenidos no son un array:", body);
            setEventos([]); 
        }
    } 

    // Función para eliminar un artículo
    async function deleteArticle(idDelete) {
        if (window.confirm("Desea eliminar este articulo del blog?")) {
            await fetch("api/article", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idDelete }),
            });
            fetchEventos();
        }
    }

    const eventosOrdenados = eventos.sort((a, b) => {
        if (a.titulo < b.titulo) return -1;
        if (a.titulo > b.titulo) return 1;
        return 0;
    });

    async function toggleCompletado(productId, currentCompletado) {
        await fetch("../api/article", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: productId,
                completado: !currentCompletado, 
            }),
        });
        // Recargar eventos después de cambiar el estado
        fetchEventos();
    }

    return (
        <div>
            <h1>Videojuegos</h1>
            {eventosOrdenados.map((evento) => (
                <div key={evento.id}>
                    <h2>
                        <Link href={"/videojuegos/" + evento.id}>
                            {evento.titulo}
                        </Link>
                    </h2>
                    <p>
                        <strong>Plataforma:</strong> {evento.plataforma}
                    </p>
                    <p>
                        <strong>Completado: </strong> 
                        <input
                            type="checkbox"
                            checked={evento.completado}
                            onChange={() => toggleCompletado(evento.id, evento.completado)}
                        />
                    </p>
                    <button onClick={() => deleteArticle(evento.id)}>
                        <strong>ELIMINAR</strong>
                    </button>
                </div>
            ))}
            <br />
            <br />
            {/* Botón para crear un nuevo artículo */}
            <button>
                <Link href={"/videojuegos/createArticle"}>
                    <b>Añadir Videojuego</b>
                </Link>
            </button>
        </div>
    );
}