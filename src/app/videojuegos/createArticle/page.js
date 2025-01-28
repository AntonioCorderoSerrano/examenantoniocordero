"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function createArticle() {
    const [title, setTitle] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [genero, setGenero] = useState("");  
    const [completado, setCompletado] = useState(false);  
    const [fechaSalida, setFechaSalida] = useState(""); 
    const router = useRouter();

    async function createArticle(event) {
        event.preventDefault();
    
        if (title === "") {
            alert("El videojuego DEBE tener un título");
            return;
        }
        if (plataforma === "") {
            alert("El videojuego DEBE contener descripción");
            return;
        }
        if (fechaSalida === "") {
            alert("Debe ingresar una fecha de salida");
            return;
        }

        if (genero === "") {
            alert("Debe ingresar un genero");
            return;
        }
    
        const articleData = {
            titulo: title,
            plataforma: plataforma,
            genero: genero,  
            fecha_lanzamiento: fechaSalida,
            completado: completado,
        };
    
        console.log("Enviando datos al servidor:", articleData); 
    
        const response = await fetch("/api/article/singleArticle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                article: articleData,
            }),
        });
    
        if (response.ok) {
            alert("videojuego creado exitosamente");
            router.push("/videojuegos")
        } else {
            const error = await response.json();
            alert("Error al crear el videojuego");
            return new Response(
                JSON.stringify({ success: "Artículo actualizado exitosamente!" }),
                { status: 200 }
            );
        }
    }
    

    return (
        <div>
            <h1>Añadir videojuego</h1>
            <form onSubmit={createArticle}>
                <label>Título</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={150}
                    required
                />
                <br />
                <label>Plataforma</label>
                <textarea
                    onChange={(e) => setPlataforma(e.target.value)}
                    required
                />
                <br />
                <label>Genero</label>
                <input
                    type="text"
                    onChange={(e) => setGenero(e.target.value)}
                    required
                />
                <br />
                <label>Completado</label>
                <input
                    type="checkbox"
                    onChange={(e) => setCompletado(e.target.value)}
                />
                <br />
                <label>Fecha de Lanzamiento</label>
                <input
                    type="date"
                    onChange={(e) => setFechaSalida(e.target.value)}
                    value={fechaSalida}
                    required
                />
                <br />
                <input type="submit" value="Añadir" />

            </form>
        </div>
    );
}