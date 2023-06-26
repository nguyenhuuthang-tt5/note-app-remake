import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import typeDefs from './schema/index.js'
import resolvers from './resolver/index.js'
import 'dotenv/config.js'
import mongoose from 'mongoose'
import './firebase/config.js'
import { getAuth } from 'firebase-admin/auth'

const app = express()

const port = process.env.PORT || 4000
//
// APOLLO CONFIG
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req, res}) => {
        return { uid: res.locals.uid }
    }
})
const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1]
        getAuth().verifyIdToken(accessToken)
            .then(decodeToken => {
                res.locals.uid = decodeToken.uid
                next()
            })
            .catch(err => {
                console.log({ err });
                return res.status(403).json({message: 'Forbien', error: err})
            })
    } else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

app.use(cors(), authorizationJWT, express.urlencoded({ extended: true }), express.json())
mongoose.set('strictQuery', false)

async function startServer() {
    await server.start()
    server.applyMiddleware({ app })
}
startServer()
// Mongo connect
const URI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@note-app-cluster-remake.h5zpq33.mongodb.net/?retryWrites=true&w=majority`;
const mongoConnect = async () => {
    try {
        await mongoose.connect(URI, {
            
        })
        console.log('Connect success');
    } catch (error) {
        console.log(error);
    }
}
mongoConnect()
// 
app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
})