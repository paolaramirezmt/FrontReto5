window.onload = () => {
    const urlMessage = "http://129.151.113.178:8080/api/Message";
    getDataCabin("http://129.151.113.178:8080/api/Cabin");
    getDataClient("http://129.151.113.178:8080/api/Client");
    const submitMessage = document.querySelector("#submitMessage");
    const messageDetails = document.querySelector("#messageDetails");

    function dataValMessage() {
        const data = {
            "messageText": $("#messagetext").val(),
            "cabin": parseInt($("#cabin").val()),
            "client": parseInt($("#client").val()),
        }
        return data
    }

    submitMessage.addEventListener("click", (e) => {
        e.preventDefault();
        data = JSON.stringify(dataValMessage());
        postData(urlMessage, data);
    })

    $("#actualizarMessage").click((e) => {
        e.preventDefault();
        data = JSON.stringify(dataValMessage());
        putData(urlMessage, data);
    })

    messageDetails.addEventListener("click", (e) => {
        e.preventDefault();
        getData(urlMessage);
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
            $("#messagetext").val("");  
        },
        error: function (xhr, status) {
            $("#messagetext").val("");
        },
        complete: function (xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#messagetext").val("");
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
            $("#messagetext").val("");
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
            $("#messagetext").val("");
        },

    });
}

function renderTable(dataMessage) {
    const tableMessage = document.querySelector("#table_message");
    tableMessage.innerHTML = `
            <tr class = "rowTable">
                <th>Message</th>
                <th>Cabin</th>
                <th>Client</th>

            </tr>`;
    for (i = 0; i < dataMessage.length; i++) {
        tableMessage.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].messageText}</td>
            <td>${dataMessage[i].cabin.name}</td>
            <td>${dataMessage[i].client.name}</td>
            <td><button type="button" class="delete_button" onclick = 'deleteById(${dataMessage[i].idMessage})'>borrar</button></td>
        </tr>
        `;
    }
}

function deleteById(id) {
    window.alert("Está seguro que desea borrar este mensaje");
    const url = "http://129.151.113.178:8080/api/Message";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
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
        },
    });
}
function getDataCabin(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== []){
                dataMessage.forEach(element => {
                    $("#cabin").append(`
                    <option value="${element.id}">${element.name}</option>
                    `)
                });
            }
        },
        error: function (xhr, status) {
            console.log(url+"/all");
            alert('Error en la petición ' + xhr.status);
        },
    });
}
function getDataClient(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== []){
                dataMessage.forEach(element => {
                    $("#client").append(`
                    <option value="${element.idClient}">${element.name}</option>
                    `)
                });
            }
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        }
    });
}