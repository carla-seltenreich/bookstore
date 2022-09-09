const renderSelectOptions = (el, data, field = 'name') => {
    data.forEach((item) => {
        var opt = document.createElement('option');
        opt.value = item.id;
        opt.innerHTML = item[field];

        el.appendChild(opt);
    });
}