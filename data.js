const productsData = [
    {
      id: 1,
      name: "Nike Flywire",
      price: 56000,
      oldPrice: 70000,
      category: "Nike",
      img: "./assets/img/nike/Air Flywire.png",
    },
    {
        id: 3,
        name: "Nike Force 1",
        price: 35000,
        oldPrice: 40000,
        category: "Nike",
        img: "./assets/img/nike/Air Force 1.png",
    },
    {
        id: 5,
        name: "Nike Jordan 11",
        price: 76000,
        oldPrice: 90000,
        category: "Nike",
        img: "./assets/img/nike/Air Jordan 11.png",
    },
    {
        id: 6,
        name: "Nike Air Max",
        price: 38000,
        oldPrice: 45000,
        category: "Nike",
        img: "./assets/img/nike/airmax.png",
    },
    {
        id: 7,
        name: "Nike Jordan 4",
        price: 58000,
        oldPrice: 65000,
        category: "Nike",
        img: "./assets/img/nike/JORDAN AIR 4.png",
    },
    {
        id: 8,
        name: "Nike Jumpman",
        price: 61000,
        oldPrice: 70000,
        category: "Nike",
        img: "./assets/img/nike/Jumpman Air Jordan.png",
    },
    {
        id: 9,
        name: "Addidas Yeezy",
        price: 91000,
        oldPrice: 100000,
        category: "Addidas",
        img: "./assets/img/addidas/-adidas-yeezy-boost.png",
    },
    {
        id: 10,
        name: "Addidas Cartoon",
        price: 61000,
        oldPrice: 70000,
        category: "Addidas",
        img: "./assets/img/addidas/Cartoon.png",
    },
    {
        id: 11,
        name: "Addidas Black Panther",
        price: 58000,
        oldPrice: 65000,
        category: "Addidas",
        img: "./assets/img/addidas/marvel black panther.png",
    },
    {
        id: 12,
        name: "Addidas Black",
        price: 61000,
        oldPrice: 70000,
        category: "Addidas",
        img: "./assets/img/addidas/addidas black.png",
    },
    {
        id: 13,
        name: "Addidas Desert",
        price: 81000,
        oldPrice: 90000,
        category: "Addidas",
        img: "./assets/img/addidas/yeezy desert.png",
    },
    {
        id: 14,
        name: "Addidas Yeezy ByW",
        price: 101000,
        oldPrice: 120000,
        category: "Addidas",
        img: "./assets/img/addidas/yeezy-adidas black-and-white.png",
    },
    {
        id: 15,
        name: "Addidas Yeezy Cartoon",
        price: 90000,
        oldPrice: 10000,
        category: "Addidas",
        img: "./assets/img/addidas/yeezy-cartoon moon.png",
    },
      
  ];
  
  const splitProducts = size => {
    let dividedProducts = []
    for (let i = 0; i < productsData.length; i+= size) {
      dividedProducts.push(productsData.slice(i, i + size))
    }
    return dividedProducts
  }
  
  // console.log(splitProducts(6)); 
  
const productsController = {
    dividedProducts: splitProducts(6), 
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length
}