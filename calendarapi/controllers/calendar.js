import { getCalendarInfo, getWeekInfo} from '../util/calendar.js'
import { MysqlClient } from '../Models/database/mysqlClient.js'
import { validateUser , validateSingUpUser} from '../Schema/UserSchema.js'
import { validateSessionData ,validatePartialSessionData} from '../Schema/SessionSchema.js'
import bcrypt from 'bcryptjs'

export class timeController{
    static async getCalendar(req, res) {
        const {year,mounth,date} = req.body
        const DateDate = await getCalendarInfo(year,mounth,date)
        return res.json(DateDate)
    }
    static async setCalendar(req, res){
        const {year,mount,date,action} = req.body
        const DateDate = await getCalendarInfo(year,mount,date,action)
        return res.json(DateDate)
    }

    static async getWeekCalendar(req, res) {
        const {n} = req.params
        const {year,mounth,date} = req.body
        const DateDate = await getWeekInfo(year,mounth,date,undefined,Number(n))
        return res.json(DateDate)
    }
    static async setWeekCalendar(req, res){
        const {n} = req.params
        const {year,mount,date,action} = req.body
        const DateDate = await getWeekInfo(year,mount,date,action,Number(n))
        return res.json(DateDate)
    }

    static async getSession(req, res){
        const Session = await MysqlClient.getLabSession()
        return res.json(Session)
    }
    static async getHoliday(req, res){
        const Session = await MysqlClient.getAllholidays()
        return res.json(Session)
    }

    static async LogIn(req, res) {
        //Validación de datos
        const result = validateUser(req.body)
        if (result.error) return res.status(401).json({error: JSON.parse(result.error.message)})
        // Datos Validados, comprobar existencia de usuario
        const {User,Password,Type} = result.data
        const UserInfo = await MysqlClient.getCredencials(User)
        if(UserInfo.credencials.length === 0) return res.status(401).json({error: [{message:"No existe el usuario"}]})
        //El usuario existe, encontrar el responsable
        const [Type1,Type2] = Type.split('-')
        const TypeToCompare = Type2 ? Type2:Type1
        const UserResponsable = UserInfo.UserOfCredencial.find((element) => element.Tipo === TypeToCompare)
        if (!UserResponsable) return res.status(203).json({error: [{message:"No existe el usuario-tipo"}]})
        // Compruebado que existe el usuario correspondiente al tipo, Encontrar el password
        const UserPassword = UserInfo.credencials.find(crencial => crencial.Responsable === UserResponsable.UUID).password
        if (!UserPassword) return res.status(401).json({error: [{message:"Usuario no valido"}]})
        //Veo si existe el password
        const LogInState = bcrypt.compareSync(UserPassword,result.data.Password)
        //const LogInState = UserPassword.localeCompare(Password)
        if (!LogInState) return res.status(401).json({error: [{message:"Contraseña no valida"}]})
        //cONTRASEÑA Válida
        return res.status(302).json({User: User,Type: Type, Responsable: UserResponsable})
    }

    static async SignUp(req, res) {
        const UserSingUp = req.body
        const result = validateSingUpUser(UserSingUp)
        if (result.error) return res.status(401).json({error: JSON.parse(result.error.message)})
        const {Name,LastName,User,Password,Type,Responsable} = result.data
        const UserInfo = await MysqlClient.getCredencials(User,Type)
        if(UserInfo.credencials.length !== 0) return res.status(401).json({error: [{message:"Ya existe el usuario"}]})
        //Usuario es nuevo
        const NewUserState = await MysqlClient.createCredencials(Name,LastName,User,Password,Type,Responsable)
        if(NewUserState.error) return res.status(401).json({error: [{message:"Ya existe la contraseña"}]})
        if(!NewUserState.Nombre) return res.status(500).json({error: [{message:"Hubo un problema"}]})
        return res.status(201).json(NewUserState)
    }

    static async deleteUser(req, res){
        // Validación de datos
        const result = validateUser(req.body)
        if (result.error) return res.status(401).json({error: JSON.parse(result.error.message)})
        // Datos Validados, comprobar si existe el usuario
        const {User,Password} = result.data
        const UserInfo = await MysqlClient.getCredencials(User)
        if(UserInfo.credencials.length === 0) return res.status(401).json({error: [{message:"No existe el usuario"}]})
        // El usuario existe, obtener la contraseña
        // const LogInState = bcrypt.compareSync(UserPassword,Password)
        const LogInState = UserInfo.credencials.map(credencial => {return credencial.password.localeCompare(Password)})
        if ((LogInState.find(element => element === 0)) === 0) {
            const UserToDelete = UserInfo.credencials.find(credencial => credencial.password.localeCompare(Password)===0)
            const DetetedUser = await MysqlClient.deleteUser(UserToDelete.UUID)
            return res.status(200).json(DetetedUser)
        }  
        return res.status(401).json({error: [{message:"Contraseña no valida"}]})
        
    }

    static async CreateSession(req, res) {
        const result = validateSessionData(req.body)
        if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
        const checkSession = await MysqlClient.getLabSession({
            Year:result.data.Year,
            Month:result.data.Month,
            Date: result.data.Date,
            Asunto: result.data.Asunto,
            Correo_responsable: result.data.Correo_responsable
        })
        if(checkSession.length > 0) return res.status(400).json({error: [{message:"Ya existe la sesion"}]})
        if(result.data.correos_invitados !== "Ninguno"){
            if(!result.data.correos_invitados.includes(';')){
                let count = 0 
                for(let i=0;i<result.data.correos_invitados.length;i++){
                    const Isarroba = result.data.correos_invitados.charAt(i).includes('@')
                    if(Isarroba) count += 1
                }
                if(count > 1) return res.status(400).json({error: [{message:"Los correos deben estar separados por comas"}]})
                
            }
            const emails = result.data.correos_invitados.split(';')
            const state = emails.every(email => email.includes('@'))
            if(!state) return res.status(400).json({error: [{message:"El Dato deben ser correos separados por comas"}]})
        }
        
        
        const NewSession = await MysqlClient.createSession(result.data)
        return res.status(201).json(NewSession)
    }

    static async deleteSession(req, res) {
        const SessionToDelete = req.body
        const result = validatePartialSessionData(SessionToDelete)
        if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
        const {Asunto,Correo_responsable} = result.data
        if(!(Asunto&&Correo_responsable)) return res.status(400).json({error: [{message:"Faltan datos"}]})
        const SessionDeleted = await MysqlClient.deleteSession({Asunto,Correo_responsable})
        return res.status(200).json(SessionDeleted)
    }
}