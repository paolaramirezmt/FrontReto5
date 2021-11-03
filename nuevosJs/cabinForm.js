window.onload = () => {
    const urlCabin = "http://129.151.120.12:8080/api/Cabin";
    getDataCategory("http://129.151.120.12:8080/api/Category/all");
    const submitCabin = document.querySelector("#submit_cabin");
    const getCabin = document.querySelector("#cabinDetails");

    function dataValCabin() {
        const data = {
            "brand": $("#brand").val(),
            "rooms": parseInt($("#rooms").val()),
            "category":{
                "id":parseInt($("#category_id").val())
            },
            "name": $("#name").val(),
            "description": $("#description").val(),
        }
        return data
    }

    submitCabin.addEventListener("click", (e) => {
        e.preventDefault();
        const data = JSON.stringify(dataValCabin());
        postData(urlCabin, data);
    })

    $("#update_cabin").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataValCabin());
        putData(urlCabin, data);
    })

    getCabin.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(urlCabin);
        getData(urlCabin);

    })
}

function postData(url, data) {
    $.ajax({
        url: url+"/save",
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            $("#description").val("");
        },
        error: function (xhr, status) {
            console.log(data);
            alert('Error en la petición ' + xhr.status);
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            $("#description").val("");
        },

    });
}

function putData(url, data){
    $.ajax({
        url: url+"/update",
        type: "PUT",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
            $("#id_cabin").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("")
            
        },

    });
}

function getData(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            renderTable(dataMessage);
        },
        error: function (xhr, status) {
            console.log(url+"/all");
            alert('Error en la petición ' + xhr.status);
        },
    });
}

function renderTable(dataMessage) {
    const tableCabin = document.querySelector("#table_cabin");
    tableCabin.innerHTML = `
            <tr class = "rowTable">
                <th>brand</th>
                <th>rooms</th>
                <th>category_id</th>
                <th>name</th>
                <th></th>
            </tr>
    `;
    for(i=0;i<dataMessage.length; i++){
     tableCabin.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].brand}</td>
            <td>${dataMessage[i].rooms}</td>
            <td>${dataMessage[i].category}</td>
            <td>${dataMessage[i].name}</td>
            <td><button type="button" onclick="deleteById(${dataMessage[i].id})">borrar</button></td>
        </tr>
        `;
    }

}

function deleteById(id) {
    window.alert("Está seguro que desea borrar esta cabaña");
    const url = "http://129.151.120.12:8080/api/Cabin";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
}

function getDataCategory(url) {
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== []){
                dataMessage.forEach(element => {
                    $("#category_id").append(`
                    <option value="${element.id}">${element.name}</option>
                    `)
                });
            }
        },
        error: function (xhr, status) {
            console.log(url);
            alert('Error en la petición ' + xhr.status);
        },
    });
}
