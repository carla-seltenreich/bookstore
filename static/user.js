const loadTable = () => {
    axios.get(`${window._APP.endpoint}/users`)
        .then((response) => {
            if (response.status === 200) {
                createTable(response.data)
            }
        })
};

loadTable();

const createTable = (data) => {
    let trHTML = '';
    const myTable = document.getElementById('mytable');

    myTable.innerHTML = '';

    data.forEach(element => {
        trHTML += '<tr>';
        trHTML += '<td>' + element.id + '</td>';
        trHTML += '<td>' + element.name + '</td>';
        trHTML += '<td>' + element.age + '</td>';
        trHTML += '<td>' + element.sex + '</td>';
        trHTML += '<td>' + element.email + '</td>';
        trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showUserEditBox(' + element.id + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + element.id + ')">Del</button></td>';
        trHTML += "</tr>";
    });
    myTable.innerHTML = trHTML;


}

const userCreate = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post(`${window._APP.endpoint}/users`, {
        name: name,
        age: age,
        sex: sex,
        email: email,
        password: password,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create user: ${error.response.data.error} `)
                .then(() => {
                    showUserCreateBox();
                })
        });
}

const getUser = (id) => {
    return axios.get(`${window._APP.endpoint}/users/` + id);
}

const userEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.put(`${window._APP.endpoint}/users/` + id, {
        name: name,
        age: age,
        sex: sex,
        email: email,
        password: password,
    })
        .then((response) => {
            Swal.fire(`User ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update user: ${error.response.data.error} `)
                .then(() => {
                    showUserEditBox(id);
                })
        });
}

const userDelete = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    axios.delete(`${window._APP.endpoint}/users/` + id)
        .then((response) => {
            Swal.fire(`User ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete user: ${error.response.data.error} `);
            loadTable();
        });
};

const renderForm = (data) => {
    return `
        <input id="id" type="hidden" value="${data ? data.id : ''}">
        <div class="mb-2">
            <input id="name" class="form-control" value="${data ? data.name : ''}" placeholder="Name">
        </div>
        <div class="mb-2">
            <input id="email" class="form-control" value="${data ? data.email : ''}" placeholder="Email">
        </div>
        <div class="mb-2">
            <input type="number" id="age" class="form-control" value="${data ? data.age : ''}" placeholder="Age">
        </div>
        <div class="mb-2">
            <input id="sex" class="form-control" value="${data ? data.sex : ''}" placeholder="Sex">
        </div>
        <div class="mb-2">
            <input id="password" class="form-control" placeholder="Password">
        </div>
    `
}

const showUserCreateBox = () => {
    Swal.fire({
        title: 'New user',
        html: renderForm(),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            userCreate();
        }
    });
}

const showUserEditBox = async (id) => {
    const user = await getUser(id);
    const data = user.data;
    Swal.fire({
        title: 'Edit User',
        html: renderForm(data),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            userEdit();
        }
    });

}

const onSearch = async (e) => {
    e.preventDefault();

    const search = document.getElementById('search').value;

    const { data } = await axios.get(`${window._APP.endpoint}/users`, {
        params: {
            name: search
        }
    });

    createTable(data);
}