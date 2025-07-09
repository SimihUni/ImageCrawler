import express from 'express';

const graph = express.Router();

graph.get('/', (req, res) => {
  res.json({    
    message: 'Graph endpoint is working',
    status: 'success'
  });
});


export default graph;