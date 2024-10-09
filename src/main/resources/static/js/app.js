var app = (function () {
    var author;

    var updateBlueprintsList = function (data) {
        var table = $("#blueprintsTable");
        table.empty();
        data.forEach(function(bp) {
            var row = `<tr><td>${bp.name}</td><td>${bp.points.length}</td><td><button onclick="app.drawBlueprint('${bp.name}')">Open</button></td></tr>`;
            table.append(row);
        });
        updateAuthorName(data);
    };

    var updateAuthorName = function(data) {
        if(data.length > 0) {
            $("#authorName").text(author + "'s blueprints");
        }
    };

    var drawBlueprint = function(name) {
        apimock.getBlueprintsByNameAndAuthor(author, name, function(blueprint) {
            var canvas = $("#blueprintCanvas")[0];
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
            ctx.beginPath();
            var points = blueprint.points;
            for (var i = 0; i < points.length - 1; i++) {
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[i + 1].x, points[i + 1].y);
            }
            ctx.stroke();
        });
    };

    return {
        getAuthorBlueprints: function () {
            author = $("#authorInput").val();
            apimock.getBlueprintsByAuthor(author, updateBlueprintsList);
        },
        drawBlueprint: drawBlueprint
    };
})();
