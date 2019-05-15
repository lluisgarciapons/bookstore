var libros = [];

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "https://api.myjson.com/bins/1h3vb3",

        success: function (json) {
            libros = json;

            createBooks();
            isotope();
        }
    });

});


$('[data-fancybox]').fancybox({
    buttons: [
   'zoom',
   'close'
 ]
});

function createBooks() {

    for (var i = 0; i < libros.books.length; i++) {

        var divFather = document.createElement("div");
        divFather.id = "book" + i;
        divFather.className += "flip-container book";
        divFather.addEventListener("touchstart", function () {
            this.classList.toggle('hover');
        });

        var divChild = document.createElement("div");
        divChild.className += "flipper";

        var divFront = document.createElement("div");
        divFront.className += "front";

        var divBack = document.createElement("div");
        divBack.className += "back";

        divChild.append(divFront);
        divChild.append(divBack);
        divFather.append(divChild);
        $("#content").append(divFather);

        fillFront(divFront, i);
        fillBack(divBack, i);
    }
}

function fillFront(divFront, i) {
    var portada = libros.books[i].portada;

    var img = document.createElement("img");
    img.setAttribute("src", portada);
    divFront.append(img);
}

function fillBack(divBack, i) {

    var titulo = libros.books[i].titulo;
    var descripcion = libros.books[i].descripcion;
    var detalle = libros.books[i].detalle;

    var divTitle = document.createElement("div");
    var divDesc = document.createElement("div");
    var divBtn = document.createElement("div");

    var title = document.createElement("h3");
    title.className = "title";
    title.textContent = titulo;
    divTitle.append(title);

    var desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = descripcion;
    divDesc.append(desc);

    var link = document.createElement("a");
    link.setAttribute("href", detalle);
    link.setAttribute("data-fancybox", "album");
    link.setAttribute("data-caption", descripcion);
    var btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = "more info";
    link.append(btn);
    divBtn.append(link);



    divBack.append(divTitle, divDesc, divBtn);
}


function isotope() {
    // quick search regex
    var qsRegex;

    // init Isotope
    var $grid = $('.content').isotope({
        itemSelector: '.book',
        layoutMode: 'fitRows',
        filter: function () {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        }
    });

    // use value of search field to filter
    var $quicksearch = $('.buscador').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }, 200));

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }

            function delayed() {
                fn();
                timeout = null;
            }
            timeout = setTimeout(delayed, threshold || 1000);
        }
    }
}
