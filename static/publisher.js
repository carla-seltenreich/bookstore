let isAjaxing = false;

const loadTable = () => {
    axios.get(`${window._APP.endpoint}/publishers`)
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
                    trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showPublisherEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="publisherDelete(' + element.id + ')">Delete</button></td>';
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


    axios.post(`${window._APP.endpoint}/publishers`, {
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
    return axios.get(`${window._APP.endpoint}/publishers/` + id);
}

const publisherEdit = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;

    axios.put(`${window._APP.endpoint}/publishers/` + id, {
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
    axios.delete(`${window._APP.endpoint}/publishers/` + id)
        .then((response) => {
            Swal.fire(`Publisher ${data.name} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete publisher: ${error.response.data.error} `);
            loadTable();
        });
};

const renderForm = (data) => {
    return `
        <input id="id" type="hidden" value="${data ? data.id : ''}">
        <div class="mb-3">
            <input id="name" class="form-control" placeholder="Name" value="${data ? data.name : ''}">
        </div>
        <div class="mb-3">
            <input type="number" min="8" max="8" id="zipcode" class="form-control" placeholder="Zipcode" oninput="findZipcode()">
        </div>
        <div class="mb-3">
            <select class="form-select" id="state" name="state" onchange="getCitiesByState()" readonly>
                <option value="">Select a state</option>
            </select>
        </div>
        <select class="form-select" id="city" name="city" readonly>
            <option value="">Select a city</option>
        </select>
    `
}

const showPublisherCreateBox = () => {
    Swal.fire({
        title: 'New publisher',
        html: renderForm(),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherCreate();
        },
        didOpen: async () => {
            const state = document.getElementById('state');
            const allStates = await getAllStates();

            renderSelectOptions(state, allStates);
        }
    });
}

const showPublisherEditBox = async (id) => {
    const publisher = await getPublisher(id);
    const data = publisher.data;

    Swal.fire({
        title: 'Edit publisher',
        html: renderForm(data),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            publisherEdit();
        },
        didOpen: async () => {
            const state = document.getElementById('state');
            const allStates = await getAllStates();

            renderSelectOptions(state, allStates);

            state.value = data.City.State.id
            getCitiesByState(data.CityId);
        }
    });
}

const getAllStates = async () => {
    const res = await axios.get(`${window._APP.endpoint}/states`);

    return res.data;
}

const getCitiesByState = async (defaultCity) => {
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const res = await axios.get(`${window._APP.endpoint}/states/${state.value}/cities`);
    const allCities = res.data.Cities;

    city.querySelectorAll('option').forEach(item => {
        item.remove()
    });

    renderSelectOptions(city, allCities);

    if (defaultCity) {
        city.value = defaultCity;
    }
};

const findZipcode = async () => {
    const zipcode = document.getElementById('zipcode').value;
    const state = document.getElementById('state');

    if (zipcode.length < 8 || isAjaxing) {
        return;
    }

    try {
        isAjaxing = true;
        const { data } = await axios.get(`${window._APP.endpoint}/address/${zipcode}`);
    
        state.value = data.StateId;
    
        getCitiesByState(data.CityId);        
    } catch (error) {
        alert(error.message ?? 'Generic error')
    } finally {
        isAjaxing = false
    }
}