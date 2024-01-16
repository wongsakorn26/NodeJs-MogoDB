const express =require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//MongoDB connect
mongoose.connect('mongodb+srv://admin:1234@cluster0.bawzlo8.mongodb.net/?retryWrites=true&w=majority' , {
    useNewURLParser: true
})

global.loggedIn = null


//controller
const indexController = require('./controller/indexController')
const loginController = require('./controller/loginController')
const regiserController = require('./controller/registerController')
const storeUserController = require('./controller/storeUserController')
const loginUserController = require('./controller/loginUserController')
const logoutUserController = require('./controller/logoutUserController')
const homeController = require('./controller/homeController')

//middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authmiddleware = require('./middleware/authmiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: 'node secret'
}))

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')



app.get('/', indexController)
app.get('/home', authmiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, regiserController)
app.post('/user/register', redirectIfAuth,  storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout' , logoutUserController)

app.listen(4000, () => {
    console.log('App listening on port 4000')
})