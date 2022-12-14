const loadTable = async (params = {}) => {
    const { data } = await axios.get(`${window._APP.endpoint}/books`, {
        params
    });
    
    createTable(data);
};

loadTable();

const createTable = (data) => {
    let trHTML = '';
    const myTable = document.getElementById('mytable');

    myTable.innerHTML = '';

    if (data.length == 0) {
        trHTML = '<tr><td class="text-center" colspan="10">No data found.</td></tr>';
    }

    data.forEach(element => {
        trHTML += '<tr>';
        trHTML += '<td>' + element.id + '</td>';
        trHTML += '<td>' + element.title + '</td>';
        trHTML += '<td>' + element.author + '</td>';
        trHTML += '<td>' + element.publication_year + '</td>';
        trHTML += '<td>' + element.pages + '</td>';
        trHTML += '<td>' + element.Category.description + '</td>';
        trHTML += '<td>' + element.Publisher.name + '</td>';
        trHTML += '<td>' + element.Format.description + '</td>';
        trHTML += '<td>' + element.price + '</td>';
        trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showBookEditBox(' + element.id + ')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')">Del</button></td>';
        trHTML += "</tr>";
    });

    myTable.innerHTML = trHTML;
}

const bookCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;
    const price = document.getElementById("price").value;
    const format = document.getElementById("format").value;

    axios.post(`${window._APP.endpoint}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId: category,
        PublisherId: publisher,
        price: price,
        FormatId: format
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} created`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to create book: ${error.response.data.error} `)
                .then(() => {
                    showBookCreateBox();
                })
        });
}

const getBook = (id) => {
    return axios.get(`${window._APP.endpoint}/books/` + id);
}

const bookEdit = () => {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;
    const price = document.getElementById("price").value;
    const format = document.getElementById("format").value;

    axios.put(`${window._APP.endpoint}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId: category,
        PublisherId: publisher,
        price: price,
        FormatId: format
    })
        .then((response) => {
            Swal.fire(`Book ${response.data.title} updated`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to update book: ${error.response.data.error} `)
                .then(() => {
                    showBookEditBox(id);
                })
        });
}

const bookDelete = async (id) => {
    const book = await getBook(id);
    const data = book.data;
    axios.delete(`${window._APP.endpoint}/books/` + id)
        .then(() => {
            Swal.fire(`Book ${data.title} deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete book: ${error.response.data.error} `);
            loadTable();
        });
};

const renderForm = (data) => {
    return `            
        <input id="id" type="hidden" value="${data ? data.id : ''}">
        <div class="mb-2">
            <input id="title" class="form-control" placeholder="Title" value="${data ? data.title : ''}">
        </div>
        <div class="mb-2">
            <input id="author" class="form-control" placeholder="Author" value="${data ? data.author : ''}">
        </div>
        <div class="mb-2">
            <input type="number" min="1900" max="2099" id="publication_year" class="form-control" placeholder="Publication year" value="${data ? data.publication_year : ''}">
        </div>
        <div class="mb-2">
            <input type="number" id="pages" class="form-control" placeholder="Pages" value="${data ? data.pages : ''}">
        </div>
        <div class="mb-2">
            <select class="form-select" id="publisher" name="publisher">
            <option value="">Select a publisher</option>
            </select>
        </div>
        <div class="mb-2">
            <select class="form-select" id="category" description="category">
            <option value="">Select a category</option>
            </select>
        </div>
        <div class="mb-2">
            <select class="form-select" id="format" description="format">
            <option value="">Select the format</option>
            </select>
        </div>
        <div class="mb-2">
            <input type="number" id="price" min="0.01" max="1000" step="0,01" class="form-control" placeholder="R$0,00" value="${data ? data.price : ''}">
        </div>`
}

const showBookCreateBox = () => {
    Swal.fire({
        title: 'Create book',
        html: renderForm(),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            bookCreate();
        },
        didOpen: async () => {
            const category = document.getElementById('category');
            const publisher = document.getElementById('publisher');
            const format = document.getElementById('format');

            const allCategories = await getAllCategories();
            const allPublishers = await getAllPublishers();
            const allFormats = await getAllFormats();

            renderSelectOptions(category, allCategories, 'description');
            renderSelectOptions(publisher, allPublishers, 'name');
            renderSelectOptions(format, allFormats, 'description');
        }
    });
}

const showBookEditBox = async (id) => {
    const book = await getBook(id);
    const data = book.data;
    Swal.fire({
        title: 'Edit Book',
        html: renderForm(data),
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            bookEdit()
        },
        didOpen: async (toast) => {
            const category = document.getElementById('category');
            const publisher = document.getElementById('publisher');
            const format = document.getElementById('format');

            const allCategories = await getAllCategories();
            const allPublishers = await getAllPublishers();
            const allFormats = await getAllFormats();

            renderSelectOptions(category, allCategories, 'description');
            renderSelectOptions(publisher, allPublishers, 'name');
            renderSelectOptions(format, allFormats, 'description');

            category.value = data.CategoryId;
            publisher.value = data.PublisherId;
            format.value = data.FormatId;
        }
    });
}

const getAllCategories = async () => {
    const res = await axios.get(`${window._APP.endpoint}/categories`);

    return res.data;
}

const getAllPublishers = async () => {
    const res = await axios.get(`${window._APP.endpoint}/publishers`);

    return res.data;
}

const getAllFormats = async () => {
    const res = await axios.get(`${window._APP.endpoint}/formats`);

    return res.data;
}

const onSearch = async (e) => {
    e.preventDefault();

    const search = document.getElementById('search').value;
    const params = {};

    if (search) {
        params.q = search
    }

    const { data } = await axios.get(`${window._APP.endpoint}/books`, {
        params
    });
    createTable(data);
}

const sortBy = async (field, e) => {
    e.preventDefault();

    const table = document.querySelector('.table');
    const el = e.target.querySelector('.table-sort');
    const order = el.getAttribute('data-sort-order') == 'asc' ? 'desc' : 'asc';

    table.querySelectorAll('[data-sort-order]').forEach(el => {
        el.classList.add('d-none');
    });

    el.setAttribute('data-sort-order', order);

    el.classList.remove('d-none');
    
    if (order === 'asc') {
        el.classList.remove('fa-arrow-down');
        el.classList.add('fa-arrow-up');
    } else {
        el.classList.remove('fa-arrow-up');
        el.classList.add('fa-arrow-down');
    }

    await loadTable({
        order,
        sort: field
    });
}