const loadTable = () => {
    axios.get(`${window._APP.endpoint}/books`)
        .then((response) => {
            if (response.status === 200) {
                const data = response.data;
                var trHTML = '';
                data.forEach(element => {
                    trHTML += '<tr>';
                    trHTML += '<td>' + element.id + '</td>';
                    trHTML += '<td>' + element.title + '</td>';
                    trHTML += '<td>' + element.author + '</td>';
                    trHTML += '<td>' + element.publication_year + '</td>';
                    trHTML += '<td>' + element.pages + '</td>';
                    trHTML += '<td>' + element.Category.description + '</td>';
                    trHTML += '<td>' + element.Publisher.name + '</td>';
                    trHTML += '<td class="text-end"><button type="button" class="btn btn-outline-secondary me-2" onclick="showBookEditBox(' + element.id + ')">Edit</button>';
                    trHTML += '<button type="button" class="btn btn-outline-danger" onclick="bookDelete(' + element.id + ')">Del</button></td>';
                    trHTML += "</tr>";
                });
                document.getElementById("mytable").innerHTML = trHTML;
            }
        })
};

loadTable();

const bookCreate = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const publication_year = document.getElementById("publication_year").value;
    const pages = document.getElementById("pages").value;
    const category = document.getElementById("category").value;
    const publisher = document.getElementById("publisher").value;

    axios.post(`${window._APP.endpoint}/books`, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        CategoryId: category,
        PublisherId: publisher
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

    axios.put(`${window._APP.endpoint}/books/` + id, {
        title: title,
        author: author,
        publication_year: publication_year,
        pages: pages,
        Categoryid: category,
        Publisherid: publisher
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
            <input id="publication_year" class="form-control" placeholder="Publication year" value="${data ? data.publication_year : ''}">
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
    `
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

            const allCategories = await getAllCategories();
            const allPublishers = await getAllPublishers();

            renderSelectOptions(category, allCategories, 'description');
            renderSelectOptions(publisher, allPublishers);
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

            const allCategories = await getAllCategories();
            const allPublishers = await getAllPublishers();

            allCategories.forEach((item, index) => {
                var opt = document.createElement('option');
                opt.value = item.id;
                opt.innerHTML = item.description;

                category.appendChild(opt);
            })

            allPublishers.forEach((item, index) => {
                var opt = document.createElement('option');
                opt.value = item.id;
                opt.innerHTML = item.name;

                publisher.appendChild(opt);
            });
            category.value = data.CategoryId;
            publisher.value = data.PublisherId;
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