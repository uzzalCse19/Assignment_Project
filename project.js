let allDrinks=[];

const loadAllDrinks=()=>{
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(res=>res.json())
    .then(data=>
    {
        allDrinks = data.drinks;
      
displayDrink(data.drinks);
    });
     };

const displayDrink=(drinks)=>
{
    const drinkContainer=document.getElementById("drink-container");
    drinkContainer.innerHTML='';
    if(drinks.length==1 && drinks[0]=="Not Found")
    {
        const div=document.createElement("div");
        div.classList.add("alert","alert-danger");
        div.innerHTML=`
        <h3>No Drinks Found</h3>`;
        drinkContainer.appendChild(div);

    }
    drinks.forEach(drink => {
        const div=document.createElement("div");
        div.classList.add("card","m-3");
        div.style.width="18rem";
        let price=(Math.random()*100).toFixed(2);
        div.innerHTML=`
        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="">
        <div class="card-body">
        <h5 class="card-title"> ${drink.strDrink}</h3>
        <h5> Category:${drink.strCategory}</h5>
       <p class="card-text">Instructions: ${drink.strInstructions.slice(0,15)}...</p>
       <h6 class>Price($): ${price}</h6>
       <button class=" btn btn-primary" onclick="singleDrink('${drink.idDrink}')">Details</button>
        <button class=" btn btn-success" onclick="handleAddToCart('${drink.strDrink}',${price})">Add to Cart</button>
        </div>
        `;
        // console.log(div);

      drinkContainer.appendChild(div);
        
    });
        
};


 const handleAddToCart=(title,price)=>
 {
    const cartCount=document.getElementById("count").innerText;
    let convertedCount=parseFloat(cartCount);
    if(convertedCount>6)
    {
        alert("You can only add up to 7 drink");
        return;
    }
    convertedCount=convertedCount+1;
    document.getElementById("count").innerText=convertedCount;
    const container=document.getElementById("main-cart-container");
    const div=document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML=`
    <p>${title}</p>
    <h3 class="price">${price}</h3>`;

    container.appendChild(div);
    upDatePrice();
};

 const upDatePrice=()=>
  {
    const allPrices=document.getElementsByClassName("price");
     let totalPrice=0;
     for(const p of allPrices)
   {
        totalPrice=totalPrice+parseFloat(p.innerText);
    }
    document.getElementById("price").innerText=totalPrice.toFixed(2);

 };


const singleDrink=(id)=>
{
//    console.log(id);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(arr=>{
        const drink=arr.drinks[0];
        document.getElementById("modalTitle").innerText=drink.strDrink;
         document.getElementById("modalImg").src=drink.strDrinkThumb;
        document.getElementById("modalDescription").innerText=drink.strInstructions;
        document.getElementById("modalCategory").innerText=drink.strCategory;
            const modal = new bootstrap.Modal(document.getElementById('drinkModal'));
            modal.show();
        
    });
 };

const searchDrink=()=>{
    const searchText=document.getElementById('searchInput').value.toLowerCase().trim();
    const finalDrink=allDrinks.filter(drink=>
        drink.strDrink.toLowerCase().includes(searchText)
    );

    if(finalDrink.length>0){
    displayDrink(finalDrink);
    }
    else{
        displayDrink(["Not Found"]);
    }
    document.getElementById('searchInput').value = '';

};

loadAllDrinks();





