"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";  

export default function Article({ params }) {
    const { id } = use(params);
    const [article, setArticle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        plataforma: '',
        fecha_lanzamiento: '',
        genero: '',
        completado: false,
    });
    const router = useRouter();

    async function fetchArticle() {
        const url = "/api/article/singleArticle?id=" + id;
        const response = await fetch(url);
        const art = await response.json();
        setArticle(art);
        setFormData({
            titulo: art.titulo,
            plataforma: art.plataforma,
            fecha_lanzamiento: art.fecha_lanzamiento,
            genero: art.genero,
            completado: art.completado,
        });
    }

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/article`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, article: formData }),
        });
        if (response.ok) {
            alert("Artículo actualizado con éxito");
            setIsEditing(false);
            fetchArticle();
        } else {
            const errorData = await response.json();
            alert("Error al actualizar el artículo: ");
        }
    };

    if (!article) {
        return <div>Cargando videojuego...</div>;
    }

    const formattedDate = new Date(article.fecha_lanzamiento).toLocaleDateString();

    return (
        <div>
            <h2>{article.titulo}</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Plataforma:
                            <input
                                type="text"
                                name="plataforma"
                                value={formData.plataforma}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Fecha de lanzamiento:
                            <input
                                type="date"
                                name="fecha_lanzamiento"
                                value={formData.fecha_lanzamiento}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Género:
                            <input
                                type="text"
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Estado de completado:
                            <input
                                type="checkbox"
                                name="completado"
                                checked={formData.completado}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Guardar cambios</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                </form>
            ) : (
                <>
                    <p><b>Plataforma:</b> {article.plataforma}</p>
                    <p><b>Fecha de lanzamiento: </b>{formattedDate}</p>
                    <p><b>Género: </b>{article.genero}</p>
                    <p><b>Estado de completado: </b>{article.completado ? 'Si' : 'No'}</p>
                    <br />
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                </>
            )}
        </div>
    );
}