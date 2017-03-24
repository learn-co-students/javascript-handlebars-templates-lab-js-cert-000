function init() {
  //dieses Object wird beim Erzeugen der Form an das template übergeben
  Handlebars.registerPartial('recipeFormPartial', document.getElementById("recipe-form-template").innerHTML)
  	var recipeFormTemplatefn = Handlebars.compile(document.getElementById("recipe-form").innerHTML);
  	var recipeFormTemplate = recipeFormTemplatefn({onsubmitAction:"createRecipe();return false;"});
  	document.getElementById("main").innerHTML += recipeFormTemplate;

    Handlebars.registerPartial('recipeDetailsPartial', document.getElementById("recipe-details-partial").innerHTML)




  // in diesem selbsterzeugten Helper ist es wichtig "this" zu verwenden, weil der Helper nur das jeweilige Element kennt
  //und seine Unterelemente - hier ist value ein Unterelement
   Handlebars.registerHelper('displayIngredient', function() {
    if(this.value!="") {
      return new Handlebars.SafeString("<li>" + this.value + "</li>")
    } else {
      return null
    }
  })



  //put any page initialization/handlebars initialization here
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})

function createRecipe(){
	var recipe = {
	recipeName: document.getElementById("name").value,
	recipeDescription: document.getElementById("recipeDescription").value,
	ingredients: document.getElementsByName("ingredients")
	}
  var recipeTemplateFn = Handlebars.compile(document.getElementById("recipe-template").innerHTML);
  var recipeTemplate = recipeTemplateFn(recipe);
  document.getElementsByTagName("main")[0].innerHTML = recipeTemplate;

   }


   function displayEditForm(){
	var recipe = {
	onsubmitAction:"updateRecipe();return false",
	description: document.getElementById("descriptionOfRecipe").innerHTML,
	name: document.getElementById("recipeName").innerHTML
	}
	for ( var i=0; i<document.querySelectorAll('ul li').length; i++){
//hier kann man eine Zahl einfach zu einem String addieren, weil js, das so interpretiert
var propertyName = "ingredient_"+i;
//hier darf die Eigenschaft als String in die eckigen Klammern geschrieben werden,
//ansonsten darf man die Eigenschaft nicht als Sting schreiben
recipe[propertyName] = document.querySelectorAll('ul li')[i].innerHTML;
}


	var recipeEditFormTemplateFn = Handlebars.compile(document.getElementById("recipe-form-template").innerHTML);
	var recipeEditFormTemplate = recipeEditFormTemplateFn(recipe)
	document.getElementsByTagName("main")[0].innerHTML = recipeEditFormTemplate;

	}







 function updateRecipe() {
	var recipe = {
	name: document.getElementById("name").value,
	description: document.getElementById("recipeDescription").value,
	ingredients: document.getElementsByName("ingredients")
	}
  var recipeTemplateFn = Handlebars.compile(document.getElementById("recipe-template").innerHTML);
  var recipeTemplate = recipeTemplateFn(recipe);
  document.getElementsByTagName("main")[0].innerHTML = recipeTemplate;

   }
