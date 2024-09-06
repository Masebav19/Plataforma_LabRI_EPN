import z from 'zod'

const SessionSchema = z.object({
    Year: z.number({
        invalid_type_error: "El año debe ser un numero"
    }).int({message: "El año debe ser un numero entero"})
    .positive({message: "El año debe ser positivo"}).min(0),
    Month: z.number({
        invalid_type_error: "El mes debe ser un numero"
    }).int({message: "El mes debe ser un numero entero"})
    .positive({message: "El mes debe ser positivo"}).min(0),
    Date: z.number({
        invalid_type_error: "El día debe ser un numero"
    }).int({message: "El día debe ser un numero entero"})
    .positive({message: "El día debe ser positivo"}).min(0),
    Asunto: z.string({required_error: "Debe contener el asunto de la sesión"}),
    Hora_inicial: z.string().includes(':').max(6,{message: "Colocar en el formato correcto"}),
    Hora_final : z.string().includes(':').max(6,{message: "Colocar en el formato correcto"}),
    Periodicidad: z.string().default("Ninguno"),
    Enlace: z.string().default("Ninguno"),
    Responsable: z.string(),
    Correo_responsable: z.string().email().endsWith('@epn.edu.ec',{message: "Debe ser un correo institucional"}),
    correos_invitados: z.string().default("Ninguno")
})


const SessionToDeleteSchema = z.object({
    Asunto: z.string(),
    Correo_responsable: z.string().email().endsWith('@epn.edu.ec',{message: "Debe ser un correo institucional"})
})
const optionalURL = SessionSchema.partial({
    Enlace: true,
});

function validateSessionData (object){
    return SessionSchema.safeParse(object)
}

function validatePartialSessionData(object){
    return SessionToDeleteSchema.safeParse(object)
}

export {validateSessionData,validatePartialSessionData}