const fs = require('fs')
export default function handle(req, res) {
    const dirs = fs.readdirSync('./pages/api').filter(x=>x != "index.js")
    res.status(200).json(dirs)
}