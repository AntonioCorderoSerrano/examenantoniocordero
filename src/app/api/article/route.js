import supabase from "../../../supabase";

export async function GET() {
    const { data: eventos, error } = await supabase
        .from("videojuego") 
        .select("*")
        .order("fecha_lanzamiento");

    if (error) {
        console.error("Error al obtener los artículos:", error);  
        return new Response(
            JSON.stringify({ error: "Error al obtener los artículos", details: error.message }),
            { status: 500 }
        );
    }

    return new Response(JSON.stringify(eventos || []), { status: 200 });
}


export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("videojuego")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify({ success: "Deletion Succesful!" }), {
        status: 200,
    });
}

export async function PUT(request) {
    const { id, completado } = await request.json();

    if (id === undefined || completado === undefined) {
        return new Response(
            JSON.stringify({ error: "ID y completado son requeridos" }),
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from("videojuego")
        .update({ completado })
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }

    return new Response(
        JSON.stringify({ success: "Estado de leído actualizado correctamente!" }),
        { status: 200 }
    );
}