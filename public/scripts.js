const currrentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")
const rows = document.querySelectorAll('.row')

for(let row of rows) {
    row.addEventListener("click", function() {
        const clienteId = row.getAttribute("id")
        window.location.href = `/cliente?_id=${clienteId}`
    })
}

for (item of menuItems) {
    if (currrentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}