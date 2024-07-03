#0.5:  Diagrama de aplicación de una sola página
<H1>0.5: Diagrama de aplicación de una sola página</H1>
<P>Describe la situación en la que el usuario ingresa a la aplicación de una sola página en https://fullstackopen.com/es/part0/fundamentos_de_las_aplicaciones_web#aplicacion-de-una-sola-pagina. </p>

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: HTML - CODE
    Note right of Browser: El browser lee el HTML y solicita el css
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: main.css
    Note right of Browser: El browser lee el HTML y solicita el js
    Browser-->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>Browser: spa.js
    Note right of Browser: El browser ejecuta el js y solicita el JSON
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: data.json
    Note right of Browser: El browser renderiza la lista de notas. 
    
```