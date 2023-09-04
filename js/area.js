// ==========>HTML ELEMENTS

let areaSection = document.getElementById("areaSection")
let areaSectionContainer = document.getElementById("areaSectionContainer")
// ===========================>Functions

async function getAria(){
  loading.classList.remove("d-none")

let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
let data = await res.json() 
loading.classList.add("d-none")

displayAreas(data.meals)
}
let allArea
function displayAreas(areas){
    allArea =areas
    let areaHtml=""
    areas.map((area,index)=>{
        areaHtml+=`
        <div class="col-lg-3 col-md-4">
    <div class="item-area rounded-2 overflow-hidden text-white text-center" onclick="displayMealsForSelectedAre(${index})">
      <div class="home-icon">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
      </div>
      <p class="fs-2">${area.strArea}</p>
    </div>
  </div>
        `
    })
    areaSectionContainer.innerHTML=areaHtml
}
function displayMealsForSelectedAre(index){
const selectedArea =allArea[index]

getMealsForSelectedarea(allArea[index].strArea)
}
async function getMealsForSelectedarea(mealsforSelectedCountry){
  loading.classList.remove("d-none")

let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealsforSelectedCountry}`)
let data = await res.json()
loading.classList.add("d-none")

displayMealsForSelectedCountry(data.meals)
}
let allmeals
function displayMealsForSelectedCountry(meals){
    allmeals=meals
    let mealsHtmls= ""
    meals.map((meal,index)=>{
    mealsHtmls+=`
    <div class="col-lg-3 col-md-4" onclick="getmealId(${index})">
    <div class="item">
      <div class="item-img">
        <img class="w-100" src="${meal.strMealThumb}" alt="" >
        <div class="layer">
          <h3>${meal.strMeal}</h3>
        </div>
      </div>
    </div>
  </div> 
    `
    areaSectionContainer.innerHTML=mealsHtmls
})
}
function getmealId(index){
const mealId =allmeals[index].idMeal;
getDescriptionMealById(mealId)
}
async function getDescriptionMealById(mealId){
  loading.classList.remove("d-none")

let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
let data = await res.json()
loading.classList.add("d-none")

displayDescriptionMealInAreaSection(data.meals)
}
function displayDescriptionMealInAreaSection(meals){
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
        

        areaSectionContainer.innerHTML =`
        <div class="col-md-4 text-white">
        <div class="mealDescImg rounded-2 overflow-hidden ">
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






// ============>Events

Area.addEventListener('click',()=>{
    getAria()
})