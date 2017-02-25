function init() {
  //put any page initialization/handlebars initialization here

}
document.addEventListener("DOMContentLoaded", function(event) {
  init();
})

//to create/append the initial Create Recipe form via the receipe-form-template
function addCreateRecipeForm() {
var createRecipeTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
document.getElementById('main').innerHTML += createRecipeTemplate();
}
addCreateRecipeForm();

function createRecipe() {
  //create Handlebars templates for recipe-template and recipe-details-partial
  var recipeTemplate = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById('recipe-details-partial').innerHTML);

  //create an object using values from form
  var recipe = {};
  recipe['name'] = document.getElementById('name').value;
  recipe['description'] = document.getElementById('description').value;
  recipe['ingredients'] = [
    {name: document.getElementsByName('ingredient')[0].value},
    {name: document.getElementsByName('ingredient')[1].value},
    {name: document.getElementsByName('ingredient')[2].value},
    {name: document.getElementsByName('ingredient')[3].value},
    {name: document.getElementsByName('ingredient')[4].value},
  ]
  debugger; //to see what recipe variable looks like and make sure it has the correct key-value pairs; esp. for "ingredients"

  Handlebars.registerHelper('displayIngredient', function() {
    if (this.name !== "" & this.name !== undefined & this.name !== null) {
      return new Handlebars.SafeString(this.name);
    } else {
      return new Handlebars.SafeString('not an ingredient');
    }
  })


  //render the template, filled in with the object containing values from form, and add to page
  document.getElementsByTagName('main')[0].innerHTML += recipeTemplate(recipe);
}

function displayEditForm() {
  //create Handlebars template for recipe form
  var recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);

}

document.getElementById('createRecipeLink').addEventListener('click', displayEditForm());


///////TRASH////////

// place this in when ready
//creating recipe-form-template and appending to page
// var recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
// document.getElementById('main').innerHTML += recipeFormTemplate();
