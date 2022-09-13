const loadTable = () => {
    axios.get(`${window._APP.endpoint}/formats`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.description + '</td>';
                    trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showFormatEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="formatDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const formatCreate = () => {
    const description = document.getElementById("description").value;

    axios.post(`${window._APP.endpoint}/formats`, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Format ${response.data.description} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create format: ${error.response.data.error} `)
                .then(() => {
                    showFormatCreateBox();
                })
        });
}

const getFormat = (id) => {
    return axios.get(`${window._APP.endpoint}/formats/` + id);
}

const formatEdit = () => {
    const id = document.getElementById("id").value;
    const description = document.getElementById("description").value;

    axios.put(`${window._APP.endpoint}/formats/` + id, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Format ${response.data.description} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update format: ${error.response.data.error} `)
                .then(() => {
                    showFormatEditBox(id);
                })
        });
}

const formatDelete = async (id) => {
    const format = await getFormat(id);
    const data = format.data;
    axios.delete(`${window._APP.endpoint}/formats/` + id)
        .then((response) => {
            loadTable();
            Swal.fire(`Format ${data.description} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete format: ${error.response.data.error} `);
            loadTable();
        });
};

const renderForm = (data) => {
    return `
        <input id="id" type="hidden" value="${data ? data.id : ''}">
        <input id="description" class="form-control" placeholder="Description" value="${data ? data.description : ''}">
    `
}

const showFormatCreateBox = () => {
    Swal.fire({
        title: 'New format',
        html: renderForm(),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            formatCreate();
        }
    });
}

const showFormatEditBox = async (id) => {
    const format = await getFormat(id);
    const data = format.data;

    Swal.fire({
        title: 'Edit format',
        html: renderForm(data),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            formatEdit();
        }
    });
}