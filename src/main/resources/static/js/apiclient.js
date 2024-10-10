var apiclient = (function () {

    var apiUrl = "http://localhost:8080/blueprints";

    return {

        getAllBlueprints: function (){
            $.get(apiUrl, function(data){
                callback(data);
            }).fail(function (){
               console.error("Error al obtener Todos los planos") 
            })
        },


        getBlueprintsByAuthor: function (author, callback) {
            $.get(apiUrl + "/" + author, function (data) {
                // Llama el callback con los datos recibidos
                callback(data);
            }).fail(function () {
                console.error("Error al obtener los planos del autor: " + author);
            });
        },

        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(apiUrl + "/" + author + "/" + name, function (data) {
                // Llama el callback con los datos recibidos
                callback(data);
            }).fail(function () {
                console.error("Error al obtener el plano " + name + " del autor " + author);
            });
        }
    };

})();
