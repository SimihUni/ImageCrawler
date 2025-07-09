import express from 'express'
import graph from './routes/graph.js'
// import crud from './routes/crud.js'

const routerConf = express.Router()

routerConf.use('/graph', graph);
// routerConf.use('/crud', crud);

export default routerConf