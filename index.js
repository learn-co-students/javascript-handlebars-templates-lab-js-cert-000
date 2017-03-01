function initForm() {
  var createRecipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementsByTagName('main')[0].innerHTML = createRecipeFormTemplate({ 'submitAction': 'createRecipe()' });
}

//create recipe from form values and add to DOMContentLoaded
function createRecipe() {
  var recipe = receiveRecipeValues();
  var recipeTemplate = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  var mainNode = document.getElementById('main');
  mainNode.innerHTML = recipeTemplate(recipe);
}

//PUT UPDATERECIPE FUNCTION HERE

function displayEditForm() {
  //receive values from form that has already been submitted
  var name = document.getElementById('created-recipe-name').innerText;
  var description = document.getElementById('created-recipe-description').innerText;
  var rawIngredientsList = document.getElementsByName('ingredientsList');
  var ingredients = [];
  for (i = 0, l = rawIngredientsList.length; i<l; i++) {
    ingredients.push(rawIngredientsList[i].innerText);
  }
  debugger; //check to see what ingredients looks like
  //create new recipe variable using variables pulled from the previous recipe
  var recipe = { name, description, ingredients, 'submitAction': 'createRecipe()' };

  //create Handlebars template for edit recipe form and pass recipe as the context
  var recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementById('main').innerHTML = recipeFormTemplate(recipe);
  debugger;
}

//create recipe context via form inputs
function receiveRecipeValues() {
  var allIngredients = document.getElementsByName('ingredients');
  var filteredIngredients = [];
  for (i = 0, l = allIngredients.length; i<l; i++) {
    if(allIngredients[i].value !== "") {
      filteredIngredients.push(allIngredients[i].value);
    }
  }

  var name = document.getElementById('name').value;
  var description = document.getElementById('description').value;
  var recipe = { name, filteredIngredients, description };
  return recipe;
}

function handlebarsSetup() {
  Handlebars.registerHelper('displayIngredient', function(ingredient) {
    return new Handlebars.SafeString('<li name="ingredientsList">' + ingredient + '</li>');
    }
  );
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById('recipe-details-partial').innerHTML);
  Handlebars.registerPartial('recipeFormPartial', document.getElementById('recipe-form-partial').innerHTML);
}

function init() {
  handlebarsSetup();
  initForm();
}

document.addEventListener("DOMContentLoaded", function(event) {
  init();
})




//////old code//////
/*
function init() {
  //put any page initialization/handlebars initialization here
}

var recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);

document.addEventListener("DOMContentLoaded", function(event) {
  init();
})

//to create/append the initial Create Recipe form via the recipe-form-template
function addCreateRecipeForm() {
  var createRecipeTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementById('main').innerHTML += createRecipeTemplate();
}
addCreateRecipeForm();

function createRecipe() {
  //create Handlebars templates for recipe-template and recipe-details-partial
  var recipeTemplate = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById('recipe-details-partial').innerHTML);

  //creating and filtering the ingredients array
  var allIngredients = [
    {name: document.getElementsByName('ingredient')[0].value},
    {name: document.getElementsByName('ingredient')[1].value},
    {name: document.getElementsByName('ingredient')[2].value},
    {name: document.getElementsByName('ingredient')[3].value},
    {name: document.getElementsByName('ingredient')[4].value},
  ]
  var filteredIngredients = allIngredients.filter(function(ingredient) {
    return ingredient.name !== "";
  });

  //create an object using values from form and filtered ingredients
  var recipe = {};
  recipe['name'] = document.getElementById('name').value;
  recipe['description'] = document.getElementById('description').value;
  recipe['ingredients'] = filteredIngredients;

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

//attaching the click event handler to the "edit recipe" link
document.getElementById('recipeLink').addEventListener('click', displayEditForm());

function displayEditForm() {
  //create Handlebars template for edit recipe form
  var recipeFormTemplate = Handlebars.compile(document.getElementById('edit-recipe-form-template').innerHTML);
  document.getElementsByTagName('main')[0].lastChild += recipeFormTemplate();
}
*/
