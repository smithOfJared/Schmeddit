<!DOCTYPE html>
<html>
  <head>
    <% include ../static/partials/head.ejs %>
  </head>
  <body>
    <main class="container">
      <% include ../static/partials/navbar.ejs %>

      <h1>Advertisements</h1>

      <ul class="list-group">
        <% advertisements.forEach((advertisement) => { %>
          <li class="list-group-item">
            <a href="/advertisements/<%= advertisement.id %>"> <%= advertisements.title %> </a>
          </li>
        <% }) %>
      </ul>

    </main>
  </body>
</html>
