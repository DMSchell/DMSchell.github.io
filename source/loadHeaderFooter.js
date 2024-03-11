document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
   
    function loadContent(url, element) {
       fetch(url)
         .then(response => response.text())
         .then(html => {
           element.innerHTML = html;
         })
         .catch(error => console.warn(error));
    }
   
    loadContent("../templates/header.html", header);
    loadContent("../templates/footer.html", footer);
});