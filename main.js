const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const productContainer = document.querySelector(".productos__container")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("actived")
    navMenu.classList.toggle("actived")
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("actived")
    navMenu.classList.remove("actived")
}))

const renderProduct = (img,nombre,categoria,precio,precioAnterior) => {
    productContainer.innerHTML += `
    <a href="">
        <div class="producto">
            <div class="img__container">
                <img class="img__producto" src="${img}" alt="">
            </div>
            <div class="descripcion__producto">
                <h3 class="nombre__producto">${nombre}</h3>
                <h4 class="categoria__producto">${categoria}</h4>
                <div class="precio__container__producto">
                    <h3 class="precio__producto">$${precio}</h3>
                    <h3 class="precio__producto__antes">$${precioAnterior}</h3>
                </div>
                <div class="boton__container__producto">
                    <button class="boton__producto">Agregar al carrito</button>
                </div>
            </div>
        </div>
    </a>"`
}

renderProduct("./assets/img/nike/Air Flywire.png", "Nike Flywire", "Nike", 56000, 70000)
renderProduct("./assets/img/nike/Air Force 1 botas.png", "Nike Air Force 1 Botas", "Nke", 38000, 50000)
renderProduct("./assets/img/nike/Air Force 1.png", "Nike Force 1", "Nike", 35000, 40000)
renderProduct("./assets/img/nike/Air Jordan 1.png", "Nike Jordan 1", "Nike", 46000, 60000)
renderProduct("./assets/img/nike/Air Jordan 11.png", "Nike Jordan 11", "Nike", 76000, 90000)
renderProduct("./assets/img/nike/airmax.png", "Nike Air Max", "Nike", 38000, 45000)
renderProduct("./assets/img/nike/JORDAN AIR 4.png", "Nike Jordan 4", "Nike", 58000, 65000)
renderProduct("./assets/img/nike/Jumpman Air Jordan.png", "Nike Jumpman", "Nike", 61000, 70000)