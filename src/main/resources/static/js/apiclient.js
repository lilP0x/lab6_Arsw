var apiclient = (function () {
    var apiUrl = "http://localhost:8080/blueprints";

    return {
        getAllBlueprints: function (callback) {
            $.get(apiUrl, function(data) {
                callback(data); // Llama al callback con los datos recibidos
            }).fail(function () {
                console.error("Error al obtener todos los planos");
            });
        },

        getBlueprintsByAuthor: function (author, callback) {
            $.get(apiUrl + "/" + author, function (data) {
                callback(data); // Llama al callback con los datos recibidos
            }).fail(function () {
                console.error("Error al obtener los planos del autor: " + author);
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(apiUrl + "/" + author + "/" + name, function (data) {
                callback(data); // Llama al callback con los datos recibidos
            }).fail(function () {
                console.error("Error al obtener el plano " + name + " del autor " + author);
            });
        },

        // Nueva función para actualizar un blueprint
        updateBlueprint: function(updatedBlueprint, callback) {
            $.ajax({
                url: apiUrl + "/" + updatedBlueprint.author + "/" +updatedBlueprint.name, // Asegúrate de que la URL sea correcta
                method: "PUT", // O "PATCH" dependiendo de cómo manejes las actualizaciones
                data: JSON.stringify(updatedBlueprint), // Convierte el objeto a JSON
                contentType: "application/json", // Establece el tipo de contenido
                function(response) {
                    callback(response); // Llama al callback con la respuesta
                },

            });
        }
    };
})();
