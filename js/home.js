// HTML ELEMENTS
let homePage = document.getElementById("homePage");


// =======> Functions
async function getHomeData(){    
let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
if(res.status !=200) return
let data = await res.json()

displayMealsinHomePage(data.meals)
}
let allMealInHomePage
function displayMealsinHomePage(mealsArr){
    allMealInHomePage = mealsArr
let homeHtml=""
mealsArr.map((meal,index)=>{
    homeHtml+=`
    <div class="col-lg-3 col-md-4" onclick="showDescriptionMealInHomePage(${index})">
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
})
homePage.innerHTML= homeHtml
}
function showDescriptionMealInHomePage(index){
    let selectedMeal = allMealInHomePage[index]
    let recipes= ""
    for (let i = 1; i <= 20; i++) {
      let strIngredient = `strIngredient${i}`
      let strMeasure = `strMeasure${i}`
      if(selectedMeal[strIngredient]){
        recipes+=`<li> ${selectedMeal[strMeasure]}  ${selectedMeal[strIngredient]}</li>`
      }    
    }

    let tagHtml=""
        if(selectedMeal.strTags !=null){
              let tags= selectedMeal.strTags.split(`,`) 
        tags.map((tag)=>{
            tagHtml += `<li class="alert alert-danger px-2 py-1">${tag}</li>`
        })

        }else{
            tagHtml=""
        }
  
    
    homePage.innerHTML=`
    <div class="col-md-4 text-white">
        <div class="mealDescImg rounded-2 overflow-hidden ">
        <img src="${selectedMeal.strMealThumb}" class="w-100" alt="" srcset="">
        </div>
        <h2>${selectedMeal.strMeal}</h2>
        </div>
        <div class="col-md-8 text-white">
        <div class="mealDescText">
          <h2>Instructions</h2>
          <p>${selectedMeal.strInstructions}</p>
          <h3 class="fw-bolder">Area : <span class="fw-medium">${selectedMeal.strArea}</span></h3>
          <h3  class="fw-bolder">Category : <span class="fw-medium">${selectedMeal.strCategory}</span></h3>
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
}




getHomeData()
