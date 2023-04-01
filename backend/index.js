const express = require('express')
var cors = require('cors')
const app = express()

const port = 3001
const uuid = () => {
    return new Date().getTime();
}
let employees = [
    {
        id: uuid(),
        name: "John Smith",
        designation: "CEO"
    }
];

app.use(express.json()) // for parsing application/json
app.use(cors())

app.get('/employee', (req, res) => {
  res.json(employees);
})

app.post('/employee', (req, res) => {
    const emp = {...req.body, id: uuid()}
    employees.push(emp)
    res.json(emp)
})

app.put('/employee/:id', (req, res) => {
    const id = Number(req.params.id)
    const empInTheRequest = req.body
    let empToBeUpdate = employees.find(e => id === e.id)
    if(empToBeUpdate) {
        empToBeUpdate["name"] = empInTheRequest.name
        empToBeUpdate["designation"] = empInTheRequest.designation
        res.json(empToBeUpdate)
    } else {
        res.status(400).json({message : `${id} not found in the db`})
    }
})

app.delete('/employee/:id',(req,res) => {
    const id = Number(req.params.id)
    const empInTheDb = employees.find(e => id === e.id)
    if(empInTheDb) {
        employees = employees.filter((e) => e.id !== empInTheDb.id) 
        res.json({message : `${id} deleted`})
    } else {
        res.status(400).json({message : `${id} not found in the db`})
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})