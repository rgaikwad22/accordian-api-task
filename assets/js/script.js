// variable declaration for selectors  
var accordianList = document.querySelector(".accordian-list");

// global variable declaratiion
var appendNotes,
    page = 1,
    arr = [];

var fetchPromise = fetch(`https://catfact.ninja/breeds?page=${page}`);
fetchPromise.then(response => {
    return response.json();
}).then(function (res) {
    var length = res.last_page;
    arr.push(res);
    for (var i = 2; i <= length; i++) {
        page = i;
        var fetchPromise = fetch(`https://catfact.ninja/breeds?page=${page}`);
        fetchPromise.then(response => {
            return response.json();
        }).then(function (dataRes) {
            arr.push(dataRes);
            if (dataRes.total === dataRes.to) {
                createAccordian(arr);
            }
        }).catch(function (error) {
            errorOccured(error)
        });
    }
})



// function declaration

function createAccordian(data) {
    console.log(data)
    for (j = 0; j < data.length; j++) {
        var accordianData = data[j].data;
        for (i = 0; i < accordianData.length; i++) {
            appendNotes = `<li class="accordian-dropdown">
            <div class="city-info">
            <h2>${accordianData[i].breed}</h2>
            <div class="bread-discription">
                <span>Country: ${accordianData[i].country}</span>
                <span>Origin: ${accordianData[i].origin}</span>
                <span>Coat: ${accordianData[i].coat}</span>
            </div>
            </div>
            <a href="#FIXME" class="dropdown" title="see_answer">dropdown</a>
        </li>`;

            accordianList.innerHTML += appendNotes;

            var dropdowns = document.querySelectorAll(".dropdown");
            dropdowns.forEach((dropdown, i) => {
                dropdown.addEventListener("click", () => handleDropdown(i));
            });
        }
    }
}

function handleDropdown(i) {
    var faqs = document.querySelectorAll(".accordian-dropdown");
    faqs[i].classList.toggle("active");
}

function errorOccured(error) {
    appendNotes = `<li class="accordian-dropdown">
        <div class="city-info">
        <h2>${error.message}: Some Error Occured</h2>
        </div>
        </li>`;
    accordianList.innerHTML += appendNotes;
}