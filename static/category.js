const loadTable = () => {
    axios.get(`${window._APP.endpoint}/categories`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.description + '</td>';
                    trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showCategoryEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="categoryDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const categoryCreate = () => {
    const description = document.getElementById("description").value;

    axios.post(`${window._APP.endpoint}/categories`, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Category ${response.data.description} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create category: ${error.response.data.error} `)
                .then(() => {
                    showCategoryCreateBox();
                })
        });
}

const getCategory = (id) => {
    return axios.get(`${window._APP.endpoint}/categories/` + id);
}

const categoryEdit = () => {
    const id = document.getElementById("id").value;
    const description = document.getElementById("description").value;

    axios.put(`${window._APP.endpoint}/categories/` + id, {
        description: description,
    })
        .then((response) => {
            Swal.fire(`Category ${response.data.description} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update category: ${error.response.data.error} `)
                .then(() => {
                    showCategoryEditBox(id);
                })
        });
}

const categoryDelete = async (id) => {
    const category = await getCategory(id);
    const data = category.data;
    axios.delete(`${window._APP.endpoint}/categories/` + id)
        .then((response) => {
            loadTable();
            Swal.fire(`Category ${data.description} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete category: ${error.response.data.error} `);
            loadTable();
        });
};

const renderForm = (data) => {
    return `
        <input id="id" type="hidden" value="${data ? data.id : ''}">
        <input id="description" class="form-control" placeholder="Description" value="${data ? data.description : ''}">
    `
}

const showCategoryCreateBox = () => {
    Swal.fire({
        title: 'New category',
        html: renderForm(),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            categoryCreate();
        }
    });
}

const showCategoryEditBox = async (id) => {
    const category = await getCategory(id);
    const data = category.data;

    Swal.fire({
        title: 'Edit Category',
        html: renderForm(data),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            categoryEdit();
        }
    });
}