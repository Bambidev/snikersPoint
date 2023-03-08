const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const products = document.querySelector('.productos__container')
const overlay = document.querySelector('.overlay')
const btnload = document.querySelector('.btn-load')
const categories = document.querySelector('.categories')
const category = document.querySelectorAll('.category')
const btnShop = document.querySelector('.nav-shopcar')
const cartMenu = document.querySelector('.cart')
const cartBubble = document.querySelector('.cart-bubble')
const productsCart = document.querySelector('.cart-container')
const succesmodal = document.querySelector('.add-modal')
const deleteBtn = document.querySelector('.borrar-btn')
const total = document.querySelector('.total')
const buyBtn = document.querySelector('.comprar-btn')
const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    header.classList.add('background__white')
  } else {
    header.classList.remove('background__white')
  }
})


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = cartList => {
  localStorage.setItem("cart", JSON.stringify(cartList))
}

const toggleMenu = () => {
    hamburger.classList.toggle('actived')
    navMenu.classList.toggle('actived')
    overlay.classList.toggle('show-overlay')
    if (cartMenu.classList.contains('open-menu')) {
        cartMenu.classList.remove('open-menu')
        return
    }
}

const toggleCart = () => {
    cartMenu.classList.toggle('open-menu')
    if (navMenu.classList.contains('actived')) {
        navMenu.classList.remove('actived')
        return
    }
}


const renderProduct = ({id,name,category,price,oldPrice,img}) => {
    return `
        <div class="producto">
            <div class="img__container">
                <img class="img__producto" src="${img}" alt="">
            </div>
            <div class="descripcion__producto">
                <h3 class="nombre__producto">${name}</h3>
                <h4 class="categoria__producto">${category}</h4>
                <div class="precio__container__producto">
                    <h3 class="precio__producto">$${price}</h3>
                    <h3 class="precio__producto__antes">$${oldPrice}</h3>
                </div>
                <div class="boton__container__producto">
                    <button class="boton__producto"
                        data-id='${id}'
                        data-name='${name}'
                        data-price='${price}'
                        data-img='${img}'>Agregar al carrito</button>
                </div>
            </div>
        </div>`
}

const renderFilterProducts = category => {
    const productList = productsData.filter(product => product.category === category)
    products.innerHTML = productList.map(renderProduct).join('')
}

const renderDividedProducts = (index = 0) => {
    const productsToRender = productsController.dividedProducts[index]
    products.innerHTML += productsToRender.map(renderProduct).join('')
}

const renderProducts = (index = 0, category = null) => {
    if (!category) {
        renderDividedProducts(index)
    } else {
        renderFilterProducts(category)
    }
}

const isLasIndex = () => productsController.nextProductsIndex === productsController.productsLimit

const showMoreProduct = () => {
    renderProducts(productsController.nextProductsIndex)
    productsController.nextProductsIndex++
    if (isLasIndex()) {
        btnload.classList.add('hidden')
    }
}

const changeBtnActiveState = selectedCategory => {
    const categories = [...category]
    categories.forEach(categoryBtn => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove('active')
        } else {
            categoryBtn.classList.add('active')
        }
    })
}

const changeShowMoreBtnState = selectedCategory => {
    if (!selectedCategory) {
        btnload.classList.remove('hidden')
        return
    } else {
        btnload.classList.add('hidden')
    }
}

const changeFilterState = selectedCategory => {
    changeBtnActiveState(selectedCategory)
    changeShowMoreBtnState(selectedCategory)
}

const applyFilter = e => {
    if (!e.target.classList.contains('category')) return 
        const clickedCategory = e.target.dataset.category
        changeFilterState(clickedCategory)
    if (!clickedCategory) {
        products.innerHTML = ''
        renderProducts()
    } else {
        renderProducts(0, clickedCategory)
        productsController.nextProductsIndex = 1
    }   
}










const renderCartProduct = ({ id, name,  price, img, quantity }) => {
    return `
   <div class="product-list">
    <div class="left">
        <img class="img__product__carrito" src="${img}" alt="">
        <div class="infoProduct">
            <h4>${name}</h4>
            <h5>${price}</h5>
      </div>
      </div>
      <div class="addDelete">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>
    `
  }
  
  const renderCart = () => {
    if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
      return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
  };
  
  const getCartTotal = () => {
    return cart.reduce((accum,currentValue) => accum + Number(currentValue.price) * currentValue.quantity, 0)
  }
  
  const showTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)}`
  }
  
  const isExistingCartProduct = ({ id }) =>
    cart.some((product) => product.id === id);
  
  
  const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}]
  }
  
  const showSuccessModal = msg => {
    succesmodal.classList.add('active-modal')
    succesmodal.textContent = msg;
    setTimeout(() => {
      succesmodal.classList.remove('active-modal')
    },1500)
  }
  
  disableBtn = button => {
    if(!cart.length) {
      button.classList.add('disabled')
    } else {
      button.classList.remove('disabled')
    }
  }
    
  const checkCartState = () => {
    // guarde en el local storage
     saveLocalStorage(cart)
    // renderize el carrito
     renderCart()
    // calcule y muestre el total
     showTotal()
    // deshabilite los botones del carrito si no hay
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    // muestre la cantidad de elementos en el carrito en el bubble
    renderCartBubble()
  }
  
  const addUnitToProduct = (product) => {
    cart = cart.map(cartProduct => cartProduct.id === product.id ? {...cartProduct, quantity: cartProduct.quantity + 1} : cartProduct)
  }
  
  const addProduct = (e) => {
    if(!e.target.classList.contains('boton__producto'))  return;
    const {id,name,price,img} = e.target.dataset;
    
    const product = { id, name, price, img }
    console.log(product);
    if (isExistingCartProduct(product)) {
      // agregar unidades al product existente
       addUnitToProduct(product)
      //mostrar el mensaje de success
      showSuccessModal('Se agrego una unidad del producto al carrito.')
    } else {
      createCartProduct(product)
      showSuccessModal('elproducto se agrego al carrito')
    }
    checkCartState()
  }
  
  const renderCartBubble = () => {
    cartBubble.innerHTML = cart.reduce((acc, cur) => acc + cur.quantity, 0)
  }
  
  const resetCartItems = () => {
    cart = [];
    checkCartState()
  }
  
  const completeCartAction = (confirmMsg, successMsg) => {
    if(!cart.length) return;
    if(window.confirm(confirmMsg)) {
      alert(successMsg);
      // vaciar el carrito
      resetCartItems()
    }
  }
  
  const completeBuy = () => {
    completeCartAction(
      "Desea completar su compra?",
      "compra realizada"
    )
  }
  
  const deleteCar = () => {
    completeCartAction(
      "Desea eliminar todos los productos del carrito?",
      "El carrito se ha vaciado"
    )
  }
  
  
  const handlePlusBtnEvent = id => {
    const existingProduct = cart.find(product => product.id === id)
    addUnitToProduct(existingProduct)
  }
  
  const removeProductFromCart = product => {
    cart = cart.filter(product => product.id !== id)
    checkCartState()
  }
  
  const substractProductUnit = ({id}) => {
     cart = cart.map (product => product.id === id ? {...product, quantity: product.quantity - 1} : product)
  }
  
  const handleMinutBtnEvent = id => {
    const existingProduct = cart.find(product => product.id === id)
  
    if (existingProduct.quantity === 1) {
      if (window.confirm('desea eliminar el producto?')) {
        removeProductFromCart(existingProduct)
      }
      return
    } 
    substractProductUnit(existingProduct)  
  }
  
  const handleQuantity = e => {
    if (e.target.classList.contains('down')) {
      // disminuir la cantidad de producto
      handleMinutBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains('up')) {
      // aumentar la cantidad de producto
      handlePlusBtnEvent(e.target.dataset.id)
    }
    checkCartState()
  }

const init = () => {
    renderProducts()
    btnload.addEventListener('click', showMoreProduct)
    hamburger.addEventListener('click', toggleMenu)
    btnShop.addEventListener('click', toggleCart)
    categories.addEventListener('click', applyFilter)

    document.addEventListener('DOMContentLoaded', renderCart)
    document.addEventListener('DOMContentLoaded', showTotal)

    productsCart.addEventListener('click', handleQuantity)

    
    products.addEventListener('click', addProduct)
    buyBtn.addEventListener('click', completeBuy)
    deleteBtn.addEventListener('click', deleteCar)

    disableBtn(deleteBtn)
    disableBtn(buyBtn)
    renderCartBubble()
}

init()