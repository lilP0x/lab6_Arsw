var apiclient = (function () {
    var apiUrl = "http://localhost:8080/blueprints";

    return {
        getAllBlueprints: function (callback) {
            $.get(apiUrl, function(data) {
                callback(data); 
            }).fail(function () {
                console.error("Error al obtener todos los planos");
            });
        },

        getBlueprintsByAuthor: function (author, callback) {
            $.get(apiUrl + "/" + author, function (data) {
                callback(data); 
            }).fail(function () {
                console.error("Error al obtener los planos del autor: " + author);
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(apiUrl + "/" + author + "/" + name, function (data) {
                callback(data); 
            }).fail(function () {
                console.error("Error al obtener el plano " + name + " del autor " + author);
            });
        },

    
        updateBlueprint: function(updatedBlueprint, callback) {
            $.ajax({
                url: apiUrl + "/" + updatedBlueprint.author + "/" +updatedBlueprint.name, 
                method: "PUT", 
                data: JSON.stringify(updatedBlueprint), 
                contentType: "application/json", 
                function(response) {
                    callback(response); 
                },

            });
        },

        createBlueprint: function(newBluePrint, callback){
            $.ajax({
                url: apiUrl, 
                method: "POST", 
                data: JSON.stringify(newBluePrint), 
                contentType: "application/json", 
                function(response) {
                    callback(response); 
                },

            });

        }
    };
})();
