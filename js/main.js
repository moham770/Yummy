$(document).ready(() => {
  let loading = document.getElementById("loading")
  
  // $(".sk-chase").fadeOut(()=>{
  //   $("#loading").slideUp(()=>{
  //     $("body").css("overflow", "visible");
  //   })
    
  // });


  //*===========================================>App Variables
  let sideBarWidth = $(".inner-sideBar").outerWidth(true);
  $("#sideBar").css("left", -sideBarWidth);

  // *================================================>Events



  //! open and close SideBar
  $(".sideBar-Icon-Toggle").click(ready);
  //! display search area
  $("#search").click(() => {
    $("#searchArea").removeClass("d-none");
    ready()

    hideHomePage();
    hideCategory();
    hideIngredientSection()
    hideAreaSection()

    
  });
  //! display Form
  $("#form").click(() => {
    $("#contact-Us-area").toggleClass("d-none");
    ready()

    hideCategory();
    hideSearchArea();
    hideAreaSection()
    hideIngredientSection()
    hideHomePage()
  });
//! display category


  $("#category").click(() => {
    $("#categoryHtml").removeClass("d-none");;
    ready()
    form();
    hideSearchArea();
    hideAreaSection()
    hideHomePage();
    hideIngredientSection()
  });

//! display area section
$("#Area").click(()=>{
  $("#areaSection").removeClass('d-none')
  ready()
  hideCategory()
  hideHomePage()
  form()
  hideSearchArea()
  hideIngredientSection()
 
})
$("#ingredient").click(()=>{
  $("#Ingredients").removeClass("d-none")
  ready()
  form()
  hideCategory()
  hideHomePage()
  hideAreaSection()
  hideSearchArea()
})



  // *====================>Functions
  //todo:Open and close sideBar with animation
  function ready() {
    if ($("#sideBar").css("left") == `0px`) {
      $("#sideBar").animate({ left: `-${sideBarWidth}` }, 500);
      $(".sideBar-Icon-Toggle").html(
        ` <i class="fa-solid open-close-icon  fa-align-justify"></i>`
      );
      $(".inner-sideBar li").animate({ top: 300 }, 10);
    } else {
      $("#sideBar").animate({ left: 0 }, 500);
      $(".sideBar-Icon-Toggle").html(
        `<i class="fa-solid open-close-icon  fa-x"></i>`
      );
      // Animate each list item to its target top position
      $(".inner-sideBar li").each((index, listItem) => {
        $(listItem).animate({ top: 0 }, 120 * (index + 1));
      });
    }
  }
  

  function hideCategory() {
    $("#categoryHtml").addClass("d-none");
  }

  function hideSearchArea() {
    $("#searchArea").addClass("d-none");
  }
  function hideHomePage() {
    homePage.classList.add("d-none");
  }

  function hideAreaSection(){
    $("#areaSection").addClass('d-none')
  }

  function form() {
    $("#contact-Us-area").addClass("d-none");
  }
  
  function hideIngredientSection(){
    $("#Ingredients").addClass('d-none')
  }


});



