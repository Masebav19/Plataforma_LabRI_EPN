import { Router } from "express"
import { timeController } from '../controllers/calendar.js'
export const router = Router()
// Para solicitar información del calendario por mes
router.get('/Dayspeermounth', timeController.getCalendar)
router.post('/Dayspeermounth',timeController.setCalendar)
router.get('/Dayspeerweek/:n', timeController.getWeekCalendar)
router.post('/Dayspeerweek/:n',timeController.setWeekCalendar)
// Para obtener las todas sesiones de Laboratorio
router.get('/getSession',timeController.getSession)
//Para obtener los feriados de todo el año
router.get('/getHoliday',timeController.getHoliday)

//Logeo de usuario
router.post('/LogIn',timeController.LogIn)
router.post('/SingUp',timeController.SignUp)
router.delete('/DeleteUser',timeController.deleteUser)

//Creacion de sessiones o reserva en el laboratorio 

router.post('/NewSession',timeController.CreateSession)
// Borrado de sesiones 
router.delete('/deleSession',timeController.deleteSession)