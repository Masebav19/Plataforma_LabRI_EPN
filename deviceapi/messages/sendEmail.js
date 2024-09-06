import { Send_email } from '../controllers/emailClient.js'
import  { emailSchema } from './messageSchema.js'

async function SenEmail(data,asunto){
    let DataEmailToSend = emailSchema;
    DataEmailToSend.To = DataEmailToSend.To.concat(';',data.email)    
    if (asunto === 'Prestamo'){
        DataEmailToSend.asunto = `Prestamo del Dispositivo: ${data.Nombre}`
        DataEmailToSend.text= 
        `Se ha prestado el siguiente equipo:
        Modelo: ${data.Modelo}
        Nombre responsable: ${data.Nombre}
        Correo: ${data.email}

        Este correo declara que la persona que realiza el prestamo es el responsable de cualquier daño, 
        evento o fallo del dispositivo. En caso de daño el responsable se hará cargo de la reparación
        o en el peor de los casos la adquisición del reemplazo

        Laboratorio de redes Industriales
        Departamento de automatización y control
        Escuela Politécnica Nacional`
    }else if (asunto === 'Devolucion'){
        DataEmailToSend.asunto = 'Devolución del Dispositivo'
        DataEmailToSend.text= 
        `Se ha devuelto el siguiente equipo:
        Modelo: ${data.Modelo}
        Correo: ${data.email}
        Observaciones del docente responsable: ${data.Observacion}
        
        Laboratorio de redes Industriales
        Departamento de automatización y control
        Escuela Politécnica Nacional`
    }else if (asunto === 'NewMantenimiento'){
        DataEmailToSend.asunto = `Inicio de matenimiento: ${data.Nombre}`
        DataEmailToSend.text= 
        `${data.Nombre} realizará el mantenimiento del siguiente dispositivo:
        Modelo: ${data.Modelo}
        Correo: ${data.email}
        Actividades a realizar: ${data.Actividades}
        
        Laboratorio de redes Industriales
        Departamento de automatización y control
        Escuela Politécnica Nacional`
    }else{
        DataEmailToSend.asunto = 'Fin del mantenimiento'
        DataEmailToSend.text= 
        `Se ha finalizado el mantenimiento del dispositivo:
        Modelo: ${data.Modelo}
        Correo: ${data.email}
        Estado: ${data.Estado}
        
        Laboratorio de redes Industriales
        Departamento de automatización y control
        Escuela Politécnica Nacional`
    }
    
    const result = await Send_email(DataEmailToSend.text,DataEmailToSend.asunto,DataEmailToSend.from,DataEmailToSend.password,DataEmailToSend.To)
    return result
}

export { SenEmail }