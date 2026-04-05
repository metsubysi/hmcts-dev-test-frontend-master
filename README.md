<h1>Frontend for Task API</h1>

<h2>Description</h2>
<p>
This is a simple frontend to test the Task API. 
To make it work, you need to run <b>two servers</b>: backend and frontend.
</p>

<h2>Requirements</h2>
<ul>
  <li>Backend API must be running (Spring Boot, Java 21)</li>
  <li>Any HTTP server for frontend (for example, Live Server or http-server)</li>
</ul>

<h2>How to Run</h2>
<ol>
  <li>Make sure the backend server is running and available at the URL defined in <code>script.js</code>.</li>
  
  <li>Start a frontend server in the folder with 
    <code>index.html</code>, <code>style.css</code>, and <code>script.js</code>.
  </li>
</ol>

<p><b>Example using http-server:</b></p>

<pre><code>npx http-server ./ -p 5500</code></pre>

<p>Open your browser and go to:</p>
<p><a href="http://localhost:5500">http://localhost:5500</a></p>

<p>
The frontend will communicate with the backend server to send and receive data.
</p>

<h2>Notes</h2>
<ul>
  <li>API URL is defined in <code>script.js</code> in the <code>baseUrl</code> variable. Change it if needed.</li>
  <li>Do not open <code>index.html</code> using <code>file://</code> — you must use a server.</li>
</ul>
