// Example from https://deno.land/ Getting Started section

// This imports the serve function from the http section of the standard library
import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

// Create a server instance ( not really since its just a func and not an oo class but whatever ) and tell it to listen on port 8000
const s = serve({ port: 8000 }); 

console.log("Serving...."); // Console.log just prints whatever you want it to in the console after you hit run
console.log("http://localhost:8000/"); // Print the address we're serving to the console

// For each connection on s respond with Hello World
// Cool thing about Deno is the builtin top level await
// await pauses the async function until promise is fulfilled
// You used to not be able to do it this easily
for await (const req of s) { 
    // the respond function can take any type of html you want
    req.respond({ body: "<h1 style='color:red;'>Hello World</h1>\n" });
}