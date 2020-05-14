// Example from https://deno.land/ Getting Started section

import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

const s = serve({ port: 8000 }); // Create a server instance and tell it to listen on port 8000
console.log("http://localhost:8000/"); 

// For each connection on s respond with Hello World
// Cool thing about Deno is the builtin top level await
for await (const req of s) { 
    req.respond({ body: "Hello World\n" });
}