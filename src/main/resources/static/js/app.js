var app = (function () {
    var author;
    var api = apiclient;
    var currentBlueprint; // Variable para almacenar el blueprint actualmente seleccionado
    var points = []; // Array para almacenar los puntos en el canvas

    // Inicialización del canvas y eventos
    var initializeCanvasEvents = function() {
        var canvas = $("#blueprintCanvas")[0];
        var ctx = canvas.getContext("2d");
        
        // Manejador de eventos para clicks en el canvas
        canvas.addEventListener("pointerdown", function(event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            // Agregar el nuevo punto al arreglo de puntos
            points.push({x: x, y: y});
            draw(); // Redibujar el blueprint con los nuevos puntos
        });
    };

    var draw = function() {
        var canvas = $("#blueprintCanvas")[0];
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
        ctx.beginPath();
        
        for (var i = 0; i < points.length - 1; i++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }
        
        ctx.stroke();
    };

    var updateBlueprint = function() {
        if (currentBlueprint) { // Verifica si hay un blueprint seleccionado
            var updatedBlueprint = {
                author: author,
                name: currentBlueprint.name,
                points: points
            };

            // Llama a la función updateBlueprint del apiclient
            api.updateBlueprint(updatedBlueprint, function(response) {
                console.log("Blueprint updated:", response);
                getAuthorBlueprints(); // Actualiza la lista después de la modificación
            });
        } else {
            console.error("No blueprint selected for update.");
        }
    };

    var getAuthorBlueprints = function() {
        author = $("#authorInput").val();
        if (author.length == 0) {
            api.getAllBlueprints(function(data) {
                updateBlueprintsList(data); // Asegúrate de pasar los datos al callback
            });
        } else {
            api.getBlueprintsByAuthor(author, updateBlueprintsList);
        }
    };

    var updateBlueprintsList = function(data) {
        var table = $("#blueprintsTable tbody");
        table.empty();
        data.forEach(function(bp) {
            var row = `<tr>
                <td>${bp.name}</td>
                <td>${bp.points.length}</td>
                <td>
                    <button onclick="app.selectBlueprint('${bp.name}')">Open</button>
                </td>
            </tr>`;
            table.append(row);
        });
        // updateAuthorName(data); // Descomentar si tienes esta función definida
    };

    var selectBlueprint = function(name) {
        // Al seleccionar un blueprint, se establece la variable currentBlueprint y se cargan los puntos
        api.getBlueprintsByNameAndAuthor(author, name, function(blueprint) {
            currentBlueprint = blueprint;
            points = blueprint.points.slice(); // Copiar los puntos para editar
            draw(); // Dibujar el blueprint seleccionado en el canvas
        });
    };

    return {
        initializeCanvasEvents: initializeCanvasEvents,
        getAuthorBlueprints: getAuthorBlueprints,
        updateBlueprint: updateBlueprint,
        selectBlueprint: selectBlueprint,
        draw: draw
    };
})();
