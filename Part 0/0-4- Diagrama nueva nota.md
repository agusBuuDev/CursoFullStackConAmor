#0.4: Nuevo diagrama de nota
<H1>0.4: Nuevo diagrama de nota</H1>
<P>Describe la situación en la que el usuario crea una nueva nota en la página https://studies.cs.helsinki.fi/exampleapp/notes escribiendo algo en el campo de texto y haciendo clic en el botón Save</p>

```mermaid

sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: HTTP POST: https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Server-->>Browser: HTTP 302: reirection to /exampleapp/notes
    Browser->>Server: HTTP GET: https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: HTML-CODE
    Browser->>Server: HTTP GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: main.css
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: main.js
    Note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    Browser->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: data.json
    Note right of Browser: The browser executes the event handler that renders notes to diplay

```

