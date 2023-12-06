
const body = document.getElementById('body')
let productsData = []
let sliderIndex = 1

const productPrepare =(prods)=>{
    console.log(prods)
    const newProduct = prods.map(prod=>{
        const {title = '', thumbnail = '', price = 0, description = '',brand ='',images = []} = prod || {}
        const productObj ={
          name: title,
         productPrice : price,
         productDes : description,
         img: thumbnail,
         productBrand : brand
        }
        return productObj
    })
    return newProduct
    
}
const showAllProducts = ()=>{
    const section = document.createElement('div')
    section.classList.add('slider-Container')
    productsData.forEach((prod,index)=>{
        console.log(prod,index)
    section.innerHTML += `
    <div class="mySlides">
    <div class="slider-div">
       <p class="numberText">${index +1} / ${productsData.length}</p>
       <img src=${prod.img} alt="">
       <h5 class="brandName">${prod.productBrand}<h5/>
    </div>
    
    <div class="slides-info">
       <h1>${prod.name}</h1>
       <h3>${prod.productDes}</h3>
    </div>
   </div>
    `
    })
    section.innerHTML += `
    
    `
    section.innerHTML += `
    <a class="prev" onclick="plusSlide(-1)">❮</a>
    <a class="next" onclick="plusSlide(1)">❯</a>
    `
    body.appendChild(section)

showSlider(sliderIndex)

}

// document.getElementById('prevBtn').addEventListener('click',()=>{
// plusSlide(-1)
// showSlider(sliderIndex)
// })
// document.getElementById('nextBtn').addEventListener('click',()=>{
// plusSlide(1)
// showSlider(sliderIndex)
// })
function plusSlide  (n){
sliderIndex = sliderIndex + n;
showSlider(sliderIndex)
}

const showSlider =(n)=>{
    const slides = document.getElementsByClassName('mySlides')
    if(n> slides.length){
    sliderIndex = 1;
    }
    if(n < 1){
    sliderIndex = slides.length;
    }
    for(let i =0; i< slides.length ; i++){
        slides[i].style.display = 'none'
    }
slides[sliderIndex - 1].style.display = 'block'
}


const getProducts =(data)=>{
console.log(data)
const { limit = 0,products =[]} = data || {}
productsData = productPrepare(products)
showAllProducts()
}

const getProductsApi= ()=>{
 fetch(`https://dummyjson.com/products?limit=3`)
.then(res => res.json())
.then(data=> getProducts(data));
            
}
getProductsApi()