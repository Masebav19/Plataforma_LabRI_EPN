import { PrismaClient } from "@prisma/client"
import { randomUUID } from 'node:crypto'

const Prisma = new PrismaClient()
export class MysqlClient{
    static async getAllholidays() {
        const holidays = await Prisma.feriados.findMany()
        return holidays
    }
    static async getLabSession(filer={}){
        const LabSession = await Prisma.sesiones.findMany({where:{AND:{...filer}}})
        return LabSession
    }
    static async getCredencials(User,Type){
        const credencials = await Prisma.credenciales.findMany({where:{
            correo: User,
            integrante:{Tipo:Type}
        }})
        const UserOfCredencial = await Promise.all(credencials.map(async (credencial) => {
                return await Prisma.integrantes.findFirst({where:{
                    UUID: credencial.Responsable 
                }})
            })
        )

        return{credencials , UserOfCredencial}
    }

    static async createCredencials(Name, LastName,User,Password,Type,Responsable){
        const [Type1,Type2]= Type.split('-')
        if(Type1 === "Estudiante"){
            const ResposableInfo = await Prisma.integrantes.findFirst({where:{
                correo: Responsable,
                Tipo: Type2
            }})
            const ResponsableCredencial = await Prisma.credenciales.findFirst({where:{
                UUID: ResposableInfo.UUID
            }})
            const UserCreated = await Prisma.integrantes.create({data:{
                UUID: randomUUID(),
                Nombre: Name,
                Apellido: LastName,
                correo: User,
                Tipo: Type,
                credenciales: {create:{
                    correo: User,
                    password: ResponsableCredencial.password,
                    Responsable: ResposableInfo.UUID
                }}
            }})
            return UserCreated
        }else{
            const UUID = randomUUID()
            const UserCreated = await Prisma.integrantes.create({data:{
                UUID: UUID,
                Nombre: Name,
                Apellido: LastName,
                correo: User,
                Tipo: Type,
                credenciales: {create:{
                    correo: User,
                    password: Password,
                    Responsable: UUID
                }}
            }})
            return UserCreated
        }
                    
    }

    static async deleteUser(UUID){
        const DeletedUser = await Prisma.integrantes.delete({where:{
            UUID: UUID,
        }})
        return DeletedUser
    }

    static async createSession (object){
        const time = object.Hora_inicial.split(':')
        const date = new Date(object.Year,object.Month,object.Date)
        object.fecha_inicio=date.toISOString()
        const newSession = await Prisma.sesiones.create({data:{...object}})
        return newSession
    }

    static async deleteSession(object){
        const SessionToDelete = await Prisma.sesiones.findFirst({where:{
            Asunto: object.Asunto,
            Correo_responsable: object.Correo_responsable
        }})
        const deletedUser = await Prisma.sesiones.delete({where:{
            Id: SessionToDelete.Id
        }})
        return deletedUser
    }
}

