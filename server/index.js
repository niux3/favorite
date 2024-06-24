import express from 'express'
import cors from 'cors'
import configuration from './configuration.js'
import * as views from './controllers/index.js'
import mock from './mock.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// mock()

for(let route of configuration.routes){
    let [controllerTxt, actionTxt] = route.view.split('.'),
        controller = new views[controllerTxt](),
        action = controller[actionTxt]
    app[route.method](route.path, action) 
}

const port = 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
