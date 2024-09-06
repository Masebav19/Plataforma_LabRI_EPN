import z, { object } from 'zod'

const UserShema = z.object({
    Name:z.string({
        required_error:"Debe colocar su nombre"
    }),
    LastName: z.string({
        required_error: "Debe colocar el apelllido"
    }),
    User: z.string().email({
        message: "El usuario debe ser un correo"
    }).endsWith('@epn.edu.ec',{
        message: "El usuario debe ser un correo institucional"
    }),
    Password: z.string({

        required_error: "Debe colocar la contraseña"
    }).min(11,{
        message: "La contraseña debe contener almenos 11 caracteres"
    }),
    Type: z.string({
        required_error:"Debe colocar un tipo"
    }),
    Responsable: z.string().email({
        message: "Debe ser el correo del responsable"
    }).endsWith('@epn.edu.ec',{
        message: "Debe ser un correo institucional"
    })
})

function validateUser(object){
    return UserShema.partial().safeParse(object)
}

function validateSingUpUser(object){
    return UserShema.safeParse(object)
}
export {validateUser, validateSingUpUser}