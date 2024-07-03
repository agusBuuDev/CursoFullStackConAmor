#0.6:  Diagrama de aplicación de una sola página
<H1>0.6: Diagrama de aplicación de una sola página</H1>
<P> Representa la situación en la que el usuario crea una nueva nota utilizando la versión de una sola página de la aplicación. en https://fullstackopen.com/es/part0/fundamentos_de_las_aplicaciones_web#aplicacion-de-una-sola-pagina. </p>

```mermaid
sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server:HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server-->>Browser: HTTP 201 Created referer: https://studies.cs.helsinki.fi/exampleapp/spa
    Note right of Browser: Browser ejecuta la función redrawNotes() en spa.js y renderiza las notas actualizadas. 
