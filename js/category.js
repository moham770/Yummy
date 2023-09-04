
let category = document.getElementById("category")
let categoryContainer = document.getElementById("categoryContainer")

async function categoryData(){
  loading.classList.remove("d-none")
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data = await res.json()
  loading.classList.add("d-none")



displayAllCategory(data.categories)
}



let categoriesArr
function displayAllCategory(categories){
  categoriesArr = categories
let categoryHtml=""
categories.map((cat,index)=>{
let maxLength= cat.strCategoryDescription.indexOf(".")
  categoryHtml+=`
  <div class="col-lg-3 col-md-4" onclick="selectCategory(${index})" >
          <div class="item">
            <div class="item-img">
              <img class="w-100" src="${cat.strCategoryThumb}" alt="">
              <div class="layerCategory">
                <div class="text-center">
                  <h3 class="fw-bold">${cat.strCategory}</h3>
                  <p class="fs-6">${cat.strCategoryDescription.slice( 0 , maxLength +1)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  `
})
categoryContainer.innerHTML=categoryHtml
}


function selectCategory(index){

getCategorySelect(categoriesArr[index].strCategory)
}


async function getCategorySelect(catName){
  loading.classList.remove("d-none")

let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
let data = await res.json()
loading.classList.add("d-none")

displayMealsFromSelectCategory(data.meals)

}

let filterArrayForCategory
function displayMealsFromSelectCategory(meals){
  filterArrayForCategory = meals
let mealsHtml = ""
meals.map((meal,index)=>{
  mealsHtml+=`
  <div class="col-lg-3 col-md-4" onclick="getmealName(${index})">
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
categoryContainer.innerHTML=mealsHtml
}


function getmealName(index){
  categoryName =filterArrayForCategory[index].strMeal
 getCategoryByName(categoryName)
}

async function getCategoryByName(namemealForCategory){
  loading.classList.remove("d-none")

let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${namemealForCategory}`)
let data = await res.json()
loading.classList.add("d-none")
displayDescriptionMeal(data.meals)
}


function displayDescriptionMeal(meals){
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
    
    categoryContainer.innerHTML=`
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






























category.addEventListener("click",()=>{
  categoryData()
})