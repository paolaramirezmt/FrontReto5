window.onload = () => {
    const submitClient = document.querySelector("#submitClient");
    const urlClient = "http://129.151.120.12:8080/api/Client";

    function dataValClient() {
        const data = {
            "email": $("#email").val(),
            "password": $("#password").val(),
            "name": $("#name").val(),
            "age": $("#age").val(),
        }
        return data
    }

    submitClient.addEventListener("click", (e) => {
        e.preventDefault();
        data = JSON.stringify(dataValClient());
        postData(urlClient, data);
    })

    $("#updateClient").click((e) => {
        e.preventDefault();
        data = JSON.stringify(dataValClient());
        putData(urlClient, data);
    })

    $("#clientDetails").click(function () {
        getData(urlClient);
    })

}
postData = (url, data) => {
    $.ajax({
        url: url+"/save",
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            $("#name").val("");
            $("#password").val("");
            $("#email").val("");
            $("#age").val("");
        },
        error: function (xhr, status) {
            console.log(xhr.status);
            $("#name").val("");
            $("#password").val("");
            $("#email").val("");
            $("#age").val("");
        },
        complete: function (xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#name").val("");
            $("#password").val("");
            $("#email").val("");
            $("#age").val("");
        }
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
            $("#id_client").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
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
            alert('Error en la petición ' + xhr.status);
        }
    });
}

function renderTable(dataMessage) {
    const tableClient = document.querySelector("#table_client");
    tableClient.innerHTML = `
        <tr class = "rowTable">
            <th>nombre</th>
            <th>email</th>
            <th>age</th>    
            <th></th>    
        </tr>
        `;
    for (i = 0; i < dataMessage.length; i++) {
        tableClient.innerHTML += `
                <tr class = "rowTable">
                    <td>${dataMessage[i].name}</td>
                    <td>${dataMessage[i].email}</td>
                    <td>${dataMessage[i].age} </td>                        
                    <td><button class="delete_button" onclick = 'deleteById(${dataMessage[i].idClient})'>borrar</button></td>
                </tr>
                `;
    }
}

function deleteById(id) {
    window.alert("Está seguro que desea borrar este cliente");
    const url = "http://129.151.120.12:8080/api/Client";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
}

