import {configDotenv} from 'dotenv'
import express from 'express'
import BodyParser from 'body-parser'
import * as FirebaseService from './service'
import Expo from "expo-server-sdk";
configDotenv()
const port = 8000
const hostname = '127.0.0.1'
const app = express()
const expo = new Expo();

const jsonParser = BodyParser.json()
const httpParser = BodyParser.urlencoded({extended: false})

app.post('/registerPushToken', jsonParser, async (req, res) => {
    const userId = String(req.body.userId)
    const token = String(req.body.token)
    await FirebaseService.saveToken(userId, token)
    return res.status(200).send('success')
})

app.post('/samples', async (req, res) => {
    const {token} = await FirebaseService.getToken('xxxxxxxxxxxxxxxxxxxxxx')
    await expo.sendPushNotificationsAsync([
        {
            to: token,
            title: 'Hello',
            body: 'World',
            data: {withSome: 'data'},
        }

    ])
    return res.status(200).send('success')
})

/*Middleware start
app.use(express.json());
Middleware end*/

/*Ending process start*/
process.on('SIGINT', async () => {
    process.exit(0);
})

process.on('SIGTERM', async () => {
    process.exit(0);
})
/*Ending process end*/

app.listen(port, hostname, () => console.log(`Server is listening on ${port}`))
