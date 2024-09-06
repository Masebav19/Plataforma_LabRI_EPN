import { MysqlClient } from "../Models/database/mysqlClient.js"
import { randomUUID } from 'node:crypto'
export async function getCalendarInfo( year,mount,date,action ){
    //DEVOLVER un array de 6x7 de los días del mes
    //const actualDate = (year >0 && mount > 0  && date >0) ? new Date(year,mount,date):new Date()
    let actualDate = new Date()
    const ActualDayNum = actualDate.getDate()
    const ActualMountNum = actualDate.getMonth()
    const ActualYearNum = actualDate.getFullYear()
    let mountInfo = actualDate.getMonth()
    let yearInfo = actualDate.getFullYear()
    if(year>0 && mount>=0 && date>0 && action==='Back') {
        actualDate = new Date(year,mount-1,date) 
        actualDate.setDate(15)
        mountInfo = actualDate.getMonth()
        yearInfo = actualDate.getFullYear()
    }
    if(year>0 && mount>=0 && date>0 && action==='Fordward') {
        actualDate = new Date(year,mount+1,date) 
        actualDate.setDate(15)
        mountInfo = actualDate.getMonth()
        yearInfo = actualDate.getFullYear()
    }   
    const DaysPeerMounth = Array(7*6).fill(null)
    actualDate.setDate(1)
    const wekDayFirstounth = actualDate.getDay()
    actualDate.setDate(-wekDayFirstounth+2)
    const holidays = await MysqlClient.getAllholidays()
    const sesionInfo = await MysqlClient.getLabSession(actualDate.getMonth())
    for (let i=0; i< DaysPeerMounth.length;i++){
        const IndexHoliday = holidays.findIndex(holiday => {
            return(holiday.Month === actualDate.getMonth() && holiday.Date === actualDate.getDate() 
            && holiday.Year === actualDate.getFullYear())
        })
        const IndexSession = sesionInfo.filter(session => {
            return ((session.Date === actualDate.getDate() && session.Month === actualDate.getMonth()&& session.Year === actualDate.getFullYear()) ||
            (session.Periodicidad === "Diariamente") ||
            (session.Date === actualDate.getDate() && (session.Periodicidad === "Anualmente" || session.Periodicidad === "Mensualmente"))||
            (session.Periodicidad=== "Semanalmente" && session.fecha_inicio.getDay()===actualDate.getDay()))
        })

        DaysPeerMounth[i] = {
            Id: randomUUID(),
            Day: actualDate.getDay(), // Día de la semana
            Date: actualDate.getDate(), // Día del mes
            isToday: ActualDayNum === actualDate.getDate() && ActualMountNum === actualDate.getMonth() && ActualYearNum == actualDate.getFullYear(),
            Mounth: actualDate.getMonth(),
            Year: actualDate.getFullYear(),
            Feriado: IndexHoliday === -1 ? "Ninguno":holidays[IndexHoliday].Nombre,
            TipoFeriado: IndexHoliday === -1 ? "Ninguno":holidays[IndexHoliday].Tipo,
            sesionInfo: IndexSession
        }
        actualDate.setDate(actualDate.getDate()+1)
    }
    const MounthInfo = mountInfo
    const YearInfo = yearInfo
    const dateInfo = {
        Mounth: MounthInfo,
        Year: YearInfo
    }
    
    return {DaysPeerMounth,dateInfo}
}
export async function getWeekInfo(year,mount,date,action,n){
    // creacion de un array de 7 

    let actualDate = new Date()
    const ActualDayNum = actualDate.getDate()
    const ActualMountNum = actualDate.getMonth()
    const ActualYearNum = actualDate.getFullYear()
    let mountInfo = actualDate.getMonth()
    let yearInfo = actualDate.getFullYear()
    if(year>0 && mount>=0 && date>0 && action==='Back') {
        actualDate = new Date(year,mount,date-n) 
        mountInfo = actualDate.getMonth()
        yearInfo = actualDate.getFullYear()
    }
    if(year>0 && mount>=0 && date>0 && action==='Fordward') {
        actualDate = new Date(year,mount,date+n) 
        mountInfo = actualDate.getMonth()
        yearInfo = actualDate.getFullYear()
    }   
    const DaysPeerWeek = Array(n).fill(null)
    if(n=== 7) actualDate.setDate(actualDate.getDate()-(actualDate.getDay()-1))
    const holidays = await MysqlClient.getAllholidays()
    const sesionInfo = await MysqlClient.getLabSession(actualDate.getMonth())
    for (let i=0; i< DaysPeerWeek.length;i++){
        const IndexHoliday = holidays.findIndex(holiday => {
            return(holiday.Month === actualDate.getMonth() && holiday.Date === actualDate.getDate() 
            && holiday.Year === actualDate.getFullYear())
        })
        const IndexSession = sesionInfo.filter(session => {
            return ((session.Date === actualDate.getDate() && session.Month === actualDate.getMonth()&& session.Year === actualDate.getFullYear()) ||
            (session.Periodicidad === "Diariamente") ||
            (session.Date === actualDate.getDate() && (session.Periodicidad === "Anualmente" || session.Periodicidad === "Mensualmente"))||
            (session.Periodicidad=== "Semanalmente" && session.fecha_inicio.getDay()===actualDate.getDay()))
        })

        DaysPeerWeek[i] = {
            Id: randomUUID(),
            Day: actualDate.getDay(), // Día de la semana
            Date: actualDate.getDate(), // Día del mes
            isToday: ActualDayNum === actualDate.getDate() && ActualMountNum === actualDate.getMonth() && ActualYearNum == actualDate.getFullYear(),
            Mounth: actualDate.getMonth(),
            Year: actualDate.getFullYear(),
            Feriado: IndexHoliday === -1 ? "Ninguno":holidays[IndexHoliday].Nombre,
            TipoFeriado: IndexHoliday === -1 ? "Ninguno":holidays[IndexHoliday].Tipo,
            sesionInfo: IndexSession
        }
        actualDate.setDate(actualDate.getDate()+1)
    }
    const MounthInfo = mountInfo
    const YearInfo = yearInfo
    const dateInfo = {
        Mounth: MounthInfo,
        Year: YearInfo
    }
    
    return {DaysPeerWeek,dateInfo}

}