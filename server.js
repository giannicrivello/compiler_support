const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {exec} = require('child_process')
const fs = require('fs')


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())
app.post('/', (req, res) => {
    const key = Object.keys(req.body)
    const content = key.toString().replace(/(^"|"$)/g, '');
    console.log(content)
    try {
        fs.writeFileSync('test.js', content);
    } catch (err) {
        console.error(err)
    }
    
    const command = "node test.js > outpt.txt" ;
    
    
    console.log(command)
    exec(command, (err, stdout, stderr) => {
        if(err) {
            console.log("something went wring")
            return
        }
        console.log(stdout)
        console.log(stderr)
    });
})

app.listen('8000', () => {
    console.log("listening on port ", 8000);
})