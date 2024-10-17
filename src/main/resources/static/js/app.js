var app = (function () {
    var author;
    var api = apiclient;
    var currentBlueprint; 
    var points = []; 

    var initializeCanvasEvents = function() {
        var canvas = $("#blueprintCanvas")[0];
        var ctx = canvas.getContext("2d");
        
        canvas.addEventListener("pointerdown", function(event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;

            points.push({x: x, y: y});
            draw(); 
        });
    };

    var draw = function() {
        var canvas = $("#blueprintCanvas")[0];
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.beginPath();
        
        for (var i = 0; i < points.length - 1; i++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);
        }
        
        ctx.stroke();
    };

    var updateBlueprint = function() {
        if (currentBlueprint) { 
            var updatedBlueprint = {
                author: author,
                name: currentBlueprint.name,
                points: points
            };

            api.updateBlueprint(updatedBlueprint, function(response) {
                console.log("Blueprint updated:", response);
                getAuthorBlueprints(); 
            });
        } else {
            console.error("No blueprint selected for update.");
        }
    };

    var getAuthorBlueprints = function() {
        author = $("#authorInput").val();
        if (author.length == 0) {
            api.getAllBlueprints(function(data) {
                updateBlueprintsList(data); 
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
                    <button onclick="app.deleteBlueprint('${bp.name}')">Delete</button>
                </td>
            </tr>`;
            table.append(row);
        });
    };

    var selectBlueprint = function(name) {
        api.getBlueprintsByNameAndAuthor(author, name, function(blueprint) {
            currentBlueprint = blueprint;
            points = blueprint.points.slice(); 
            draw(); 
        });
    };


    var createBluePrint = function(){

        //Prepara el canvas eliminandolo 
        var table = $("#blueprintsTable tbody");
        var canvas = $("#blueprintCanvas")[0];
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        table.empty();


    
    }
    var deleteBlueprint = function(name) {
       
        if (author && name) {
            api.deleteBlueprint(author, name, function(response) {
                setTimeout(function() {
                    getAuthorBlueprints(); 
                }, 100); 
            });
        } else {
            console.error("No se puede eliminar el blueprint: autor o nombre faltantes.");
        }
    };
    
    
    return {
        initializeCanvasEvents: initializeCanvasEvents,
        getAuthorBlueprints: getAuthorBlueprints,
        updateBlueprint: updateBlueprint,
        selectBlueprint: selectBlueprint,
        draw: draw,
        createBluePrint:createBluePrint,
        deleteBlueprint:deleteBlueprint
    };
})();
