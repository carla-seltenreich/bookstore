const ENDPOINT = "http://localhost:3007";

const loadTable = () => {
    axios.get(`${ENDPOINT}/publishers`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.name + '</td>';
                    trHTML += '<td>' + element.City.State.name + '</td>';
                    trHTML += '<td>' + element.City.name + '</td>';
                    trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showPublisherEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publisherDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const publisherCreate = () => {
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;


    axios.post(`${ENDPOINT}/publishers`, {
        name: name,
        CityId: city
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherCreateBox();
                })
        });
}

const getPublisher = (id) => {
    return axios.get(`${ENDPOINT}/publishers/` + id);
}

const publisherEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;

    axios.put(`${ENDPOINT}/publishers/` + id, {
        name: name,
        CityId: city
    })
        .then((response) => {
            Swal.fire(`Publisher ${response.data.name} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update publisher: ${error.response.data.error} `)
                .then(() => {
                    showPublisherEditBox(id);
                })
        });
}

const publisherDelete = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;
    axios.delete(`${ENDPOINT}/publishers/` + id)
        .then((response) => {
            Swal.fire(`Publisher ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
            loadTable();
        });
};

const showPublisherCreateBox = () => {
    Swal.fire({
        title: 'Create publisher',
        html: `
            <input id="id" type="hidden">
            <input id="name" class="swal2-input" placeholder="Name">
            <select class="swal2-input" id="state" name="state" onchange="getCitiesByState()">
                <option value="">select state</option>
            </select>
            <select class="swal2-input" id="city" name="city">
                <option value="">select city</option>
            </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherCreate();
        },
        didOpen: async (toast) => {
            const state = document.getElementById('state');
            const allStates = await getAllStates();

            allStates.forEach((item, index) => {
                var opt = document.createElement('option');
                opt.value = item.id;
                opt.innerHTML = item.name;

                state.appendChild(opt);
            })
        }
    });
}

// const showPublisherEditBox = async (id) => {
//     const publisher = await getPublisher(id);
//     const data = publisher.data;
//     Swal.fire({
//         title: 'Edit publisher',
//         html:
//             '<input id="id" type="hidden" value=' + data.id + '>' +
//             '<input id="name" class="swal2-input" placeholder="Name" value="' + data.name + '">',
//         focusConfirm: false,
//         showCancelButton: true,
//         preConfirm: () => {
//             publisherEdit();
//         }
//     });
// }

const showPublisherEditBox = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;

    Swal.fire({
        title: 'Edit publisher',
        html: `
            <input id="id" type="hidden" value="${data.id}">
            <input id="name" class="swal2-input" placeholder="Name" value="${data.name}">
            <select class="swal2-input" id="state" name="state" onchange="getCitiesByState()">
                <option value="">select state</option>
            </select>
            <select class="swal2-input" id="city" name="city">
                <option value="">select city</option>
            </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherEdit();
        },
        didOpen: async (toast) => {
            const state = document.getElementById('state');
            const allStates = await getAllStates();

            allStates.forEach((item, index) => {
                var opt = document.createElement('option');
                opt.value = item.id;
                opt.innerHTML = item.name;

                state.appendChild(opt);
            });

            state.value = data.City.State.id
            getCitiesByState(data.CityId);
        }
    });
}

const getAllStates = async () => {
    const res = await axios.get(`${ENDPOINT}/states`);

    return res.data;
}

const getCitiesByState = async (defaultCity) => {
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const res = await axios.get(`${ENDPOINT}/states/${state.value}/cities`);
    const allCities = res.data.Cities;

    city.querySelectorAll('option').forEach(item => {
        item.remove()
    });

    allCities.forEach((item) => {
        var opt = document.createElement('option');
        opt.value = item.id;
        opt.innerHTML = item.name;

        city.appendChild(opt);
    });

    if (defaultCity) {
        city.value = defaultCity;
    }
};