import express from 'express'
import graph from './routes/graph.js'
import crud from './routes/crud.js'

const routerConf = express.Router()

routerConf.use(function(req,res,next){
    console.log(`${(new Date()).toISOString()} ${req.method} ${req.path} ${req.body ? JSON.stringify(req.body) : ''}`);
    next();
})

routerConf.use('/graph', graph);
routerConf.use('/crud', crud);

export default routerConf