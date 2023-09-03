// *=================>HTML ELEMENTS
let ingredient = document.getElementById("ingredient")
let ingredientsContainer = document.getElementById("ingredientsContainer")




// *=================>Functions

async function getAllIngredients(){
let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
let data = await res.json()
const Ingredientdata =data.meals
const finalData= Ingredientdata.slice(0,20)

displayAllIngredients(finalData)
}

let AllIngredients
function displayAllIngredients(allIngredients){
    AllIngredients =allIngredients
    let IngredHtml =""
     allIngredients.map((ingred,index)=>{
        let lengthDesc =ingred.strDescription.indexOf(".")
        IngredHtml+=`
        <div class="col-lg-3 col-md-4" onclick="selecetKindOfMeals(${index})">
        <div class="ingredient-item">
          <div class="ingredient-icon">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          </div>
          <h3>${ingred.strIngredient}</h3>
          <p>${ingred.strDescription.slice(0,lengthDesc +1)}</p>
        </div>
      </div>
        `
       
     })
     ingredientsContainer.innerHTML = IngredHtml
}

function selecetKindOfMeals(index){
    let nameOfIngredient =AllIngredients[index].strIngredient
 
    getMealsForIngredient(nameOfIngredient)
}
async function getMealsForIngredient(nameOfIngredient){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameOfIngredient}`)
    let data = await res.json()
    
    displayMealsForIngredient(data.meals)
}
let SelectedMealArray
function displayMealsForIngredient(meals){
    SelectedMealArray =meals
    let mealHtml =""
    
    meals.map((meal,index)=>{
        mealHtml +=`
        <div class="col-lg-3 col-md-4" onclick="getIdMealForIngredient(${index})">
        <div class="item">
          <div class="item-img">
            <img class="w-100" src="${meal.strMealThumb}" alt="" >
            <div class="layer">
              <h3 class="text-black">${meal.strMeal}</h3>
            </div>
          </div>
        </div>
      </div> 
        `
    })
    ingredientsContainer.innerHTML= mealHtml
}

function getIdMealForIngredient(index){
const idMeal=SelectedMealArray[index].idMeal
getDesMealByIdForIngredients(idMeal)

}


async function getDesMealByIdForIngredients(idMeal){
    let res= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let data = await res.json()
    displayDescMealForIngredient(data.meals)
}

function displayDescMealForIngredient(meals){

meals.map((meal)=>{

    let recipes= ""
    for (let i = 1; i <= 20; i++) {
      let strIngredient = `strIngredient${i}`
      let strMeasure = `strMeasure${i}`
      if(meal[strIngredient]){
        recipes+=`<li> ${meal[strMeasure]}  ${meal[strIngredient]}</li>`
      }    
    }

    let tagHtml=""
    if(meal.strTags !=null ){
      let tags= meal.strTags.split(`,`) 
      tags.map((tag)=>{
      tagHtml += `<li class="alert alert-danger px-2 py-1">${tag}</li>`
  })
  }else{
      tagHtml=""
  }


    ingredientsContainer.innerHTML =`
    <div class="col-md-4 text-white ingredientsCol">
    <div class="mealDescImg rounded-2 overflow-hidden  ">
    <img src="${meal.strMealThumb}" class="w-100" alt="" srcset="">
    </div>
    <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
    <div class="mealDescText">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3 class="fw-bolder">Area : <span class="fw-medium">${meal.strArea}</span></h3>
      <h3  class="fw-bolder">Category : <span class="fw-medium">${meal.strCategory}</span></h3>
      <h3 class="fw-bolder">Recipes :</h3>
        <ul class=" d-flex flex-wrap list-unstyled Recipe">
    ${recipes}
        </ul>
        <h3 class="fw-bolder">Tags :</h3>
        <ul class="list-unstyled tags d-flex flex-wrap">
          ${tagHtml}
        </ul>
        <div class="btn btn-success" id="sourceBtn" >Source</div>
        <div class="btn btn-danger" id="youtubeBtn">Youtube</div>
    </div>
    </div>
    `
    let sourceBtn =document.getElementById('sourceBtn')
    sourceBtn.addEventListener("click",()=>{
     open(meal.strSource)
    })
    let youtubeBtn = document.getElementById('youtubeBtn')
    youtubeBtn.addEventListener('click',()=>{
      open(meal.strYoutube)
    })
})

}

// *=================>Events
ingredient.addEventListener('click',()=>{
    getAllIngredients()
})
