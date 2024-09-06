import dotenv from 'dotenv'

dotenv.config()

const emailSchema = {
    To: "mateo.vasquez@epn.edu.ec",
    from: "mateo.vasquez1723@outlook.com",
    password: process.env.EMAIL_PASSWORD,
    asunto: '',
    text: ''
}

export  {emailSchema}