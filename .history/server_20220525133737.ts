// require built-in modules
import http from 'http';
import fs from 'fs';
import mime from 'mime-types';
const port = 3000;

let lookup = mime.lookup; //alias for mime.lookup

// when the server is instantiated (created) it is IMMUTABLE
const server = http.createServer(function(req, res)
{

    let path = req.url as string; // alias for req.url

    if(path === "/" || path === "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;
    console.log(`MIME TYPE: ${mime_type}`);

    //reads a file from the file system
    fs.readFile(__dirname + path, function (err, data)
    {
        //if there is an error existing with the url
        if(err)
        {
            res.writeHead(404); //file not found
            console.log(`ERROR: ${err.message}`);
            return res.end("ERROR: 404");
            
        }

        // no error exist
        res.setHeader("X-Content-Type-Options", "nosniff");

        res.writeHead(200); //all ok
        console.log(`full file name: ${__dirname}${req.url}`)
        return res.end(data); //outputs the file to the browser

    })
    //this code bellow is another way to do that above ^
    //this next console log is showing only in console not in browser
    //console.log("hello, console");
    //console.log("Directory Name: " + __dirname);
});

server.listen(port, function()
{
    console.log("Server Running at Port: " + port);
});

