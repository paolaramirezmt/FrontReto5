window.onload = () => {
    const urlCategory = "http://129.151.120.12:8080/api/Category";
    function dataCategory() {
        data = {
            "name": $("#name").val(),
            "description": $("#description").val()
        }
        return data;
    }

    $("#submitCategory").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        postData(urlCategory , data);
    })

    $("#updateCategory").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        putData(urlCategory, data);
    })

    $("#categoryDetails").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        getData(urlCategory + "/all");

    })

}
// ===================================================
function postData(url, data) {
    $.ajax({
        url: url+"/save",
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#name").val("");
            $("#description").val("");
            getData(url+"/all");
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
            $("#name").val("");
            $("#description").val("");
        }

    });
}

function putData(url, data) {
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
        }
    });
}

function getData(url) {
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== undefined){
                renderTable(dataMessage);
                $("#emptyCategories").val("")
            }else{
                $("#emptyCategories").val("No hay categorias para mostrar");
            }
        },
        error: function (xhr, status) {
            console.log(url);
            alert('Error en la petición ' + xhr.status);
        },
    });
}

function renderTable(dataMessage) {
    const tableCabin = document.querySelector("#table_category");
    tableCabin.innerHTML = `
            <tr class = "rowTable">
                <th>name</th>
                <th>description</th>
                <th>cabañas</th>
                <th></th>
                <th></th>
            </tr>
    `;
    for (i = 0; i < dataMessage.length; i++) {
        tableCabin.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].name}</td>
            <td>${dataMessage[i].description}</td>
            <td>${dataMessage[i].cabins}</td>
            <td><button type="button" onclick="deleteById(${dataMessage[i].id})">borrar</button></td>
        </tr>
        `;
    }

}

function deleteById(id) {   
    window.alert("Está seguro que desea borrar esta cabaña");
    const url = "http://129.151.120.12:8080/api/Category";
    fetch(url + "/" + id, {
        method: "DELETE"
    })
        .finally(() => {
            getData(url+"/all");
        })
}