
// *======================>*Html Elements
let inputName =document.getElementById('inputName')
let inputFristLatter =document.getElementById('inputFristLatter')
let searchContainer =document.getElementById('searchContainer')
let searchInputs =document.getElementById('searchInputs')

//*======================> functions
// todo:search Functions


// *====>Search By Name <================//
async function searchByName(value){
  loading.classList.remove("d-none")
let res =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
if(res.status != 200) return
let data = await res.json()
loading.classList.add("d-none")
displayMealsInSearchPage(data.meals)
}
let searchMeal
 function displayMealsInSearchPage(meals){
  let searchHtml =""
  meals.map((meal,index)=>{
    searchHtml+=`
    <div class="col-lg-3 col-md-4" onclick="showdescMealInSearch(${index})">
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
    searchMeal =meals
  })

  searchContainer.innerHTML = searchHtml
}
function showdescMealInSearch(index){
  searchInputs.classList.add('d-none')
let selectedMeal = searchMeal[index]
let recipes= ""
for (let i = 1; i <= 20; i++) {
  let strIngredient = `strIngredient${i}`
  let strMeasure = `strMeasure${i}`
  if(selectedMeal[strIngredient]){
    recipes+=`<li> ${selectedMeal[strMeasure]}  ${selectedMeal[strIngredient]}</li>`
  }    
}

let tagHtml=""
      if(selectedMeal.strTags !=null ){
          let tags= selectedMeal.strTags.split(`,`) 
    tags.map((tag)=>{
        tagHtml += `<li class="alert alert-danger px-2 py-1">${tag}</li>`
    })
    }else{
        tagHtml=""
    }
searchContainer.innerHTML =`
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
let sourceBtn =document.getElementById('sourceBtn')
sourceBtn.addEventListener("click",()=>{
 open(selectedMeal.strSource)
})
let youtubeBtn = document.getElementById('youtubeBtn')
youtubeBtn.addEventListener('click',()=>{
  open(selectedMeal.strYoutube)
})

if(inputFristLatter.value =""){
  searchInputs.classList.remove('d-none')
}else{
  searchInputs.classList.add('d-none')

}

}


//*===============================>Search By Frist Latter <================================================================//

async function searchByFristChar(value){
  loading.classList.remove("d-none")
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
if(res.status != 200) return
  let data = await  res.json()
  loading.classList.add("d-none")
  displayMealsByFristChar(data.meals)
}
let mealsSearchFristLatter
function displayMealsByFristChar(meals){
let searchByChar=""
meals.map((meal,index)=>{
  searchByChar +=`
  <div class="col-lg-3 col-md-4" onclick="showdescCardInSearchByFristLatter(${index})">
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
  mealsSearchFristLatter = meals
})
searchContainer.innerHTML = searchByChar
}
function showdescCardInSearchByFristLatter(index){
let selectedMeal = mealsSearchFristLatter[index]
// recipes
let recipes= ""
for (let i = 1; i <= 20; i++) {
  let strIngredient = `strIngredient${i}`
  let strMeasure = `strMeasure${i}`
  if(selectedMeal[strIngredient]){
    recipes+=`<li> ${selectedMeal[strMeasure]}  ${selectedMeal[strIngredient]}</li>`
  }    
}
// tags
let tagHtml=""
if(selectedMeal.strTags != null ){
        let tags= selectedMeal.strTags.split(`,`) 
    tags.map((tag)=>{
        tagHtml += `<li class="alert alert-danger px-2 py-1">${tag}</li>`
    })
    }else{
        tagHtml=""
    }

// display discription meal
searchContainer.innerHTML =`
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
let sourceBtn =document.getElementById('sourceBtn')
sourceBtn.addEventListener("click",()=>{
 open(selectedMeal.strSource)
})
let youtubeBtn = document.getElementById('youtubeBtn')
youtubeBtn.addEventListener('click',()=>{
  open(selectedMeal.strYoutube)
})




if(inputFristLatter.value =""){
  searchInputs.classList.remove('d-none')
}else{
  searchInputs.classList.add('d-none')

}


}



//***=============>Events For Search in Puts */
inputFristLatter.addEventListener('input',()=>{
  if(inputFristLatter.value!=""){
    searchByFristChar(inputFristLatter.value)
  }else{
    searchContainer.innerHTML=""
  }

})


inputName.addEventListener("input", ()=>{
  if(inputName.value !=""){

    searchByName(inputName.value)
  }else{
    searchContainer.innerHTML = ""
  }
})
