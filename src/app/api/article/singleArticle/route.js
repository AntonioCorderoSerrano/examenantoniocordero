import supabase from "../../../../supabase";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const { data: article, error } = await supabase
        .from("videojuego")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(article), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const article = body.article;
    const { data: createData, error } = await supabase
        .from("videojuego")
        .insert([
            {
                titulo: article.titulo,
                plataforma: article.plataforma,
                genero: article.genero,  
                fecha_lanzamiento: article.fecha_lanzamiento || "",  
                completado: article.completado || false,  
            }
        ]);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(
        JSON.stringify({ success: "Artículo creado exitosamente!" }),
        { status: 201 }
    );
}

export async function PUT(request) {
    const body = await request.json();
    const { id, article } = body;  
    const { data: updateData, error } = await supabase
        .from("videojuego")  
        .update({
            titulo: article.titulo,
            plataforma: article.plataforma,
            genero: article.genero,
            fecha_lanzamiento: article.fecha_lanzamiento || "",
            completado: article.completado || false,
        })
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(
        JSON.stringify({ success: "Artículo actualizado exitosamente!" }),
        { status: 200 }
    );
}