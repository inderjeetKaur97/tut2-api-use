const fs = require('fs') 
const request = require('request') 
const http = require('http')
const homeFile = fs.readFileSync("home.html","utf-8")
function replaceVal(homeFile,element){
    homeFile=  homeFile.replace("{%temp%}",element.main.temp)
    homeFile= homeFile.replace("{%temp-min%}",element.main.temp_min)
    homeFile=homeFile.replace("{%temp-max%}",element.main.temp_max)
    return homeFile
}
const server = http.createServer((req,res)=>{
    if (req.url==='/'){
        request('https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=2f60278731d4b1e44138975ed06927ab').on("data",(chunk)=>{
            chundata=chunk.toString('utf8')
            arrData = [JSON.parse(chundata)]
            arrData.map(element =>{
            realTimeData = replaceVal(homeFile,element)
            // console.log(realTimeData)
            res.write(realTimeData)

            })
        }).on("end",(err)=>{
            res.end()
        })
 
    }
    
} )
server.listen(8000,"127.0.0.1",()=>{
    console.log("app running at port 8000")
})