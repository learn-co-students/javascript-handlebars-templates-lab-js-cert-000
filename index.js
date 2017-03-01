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

function updateRecipe() {
  var recipe = receiveRecipeValues();
  var recipeTemplate = Handlebars.compile(document.getElementById('recipe-template').innerHTML);
  document.getElementById('main').innerHTML = recipeTemplate(recipe);
}

function displayEditForm() {
  //receive values from form that has already been submitted
  var name = document.getElementById('created-recipe-name').innerText;
  var description = document.getElementById('created-recipe-description').innerText;
  var rawIngredientsList = document.getElementsByName('ingredientsList');
  var ingredients = [];
  for (i = 0, l = rawIngredientsList.length; i<l; i++) {
    ingredients.push(rawIngredientsList[i].innerText);
  }

  //create new recipe variable using variables pulled from the previous recipe
  var recipe = { name, description, ingredients, 'submitAction': 'createRecipe()' };

  //create Handlebars template for edit recipe form and pass recipe as the context
  var recipeFormTemplate = Handlebars.compile(document.getElementById('recipe-form-template').innerHTML);
  document.getElementById('main').innerHTML = recipeFormTemplate(recipe);
}

//create recipe context via form inputs
function receiveRecipeValues() {
  var allIngredients = document.getElementsByName('ingredients');
  var ingredients = [];
  for (i = 0, l = allIngredients.length; i<l; i++) {
    if(allIngredients[i].value !== "") {
      ingredients.push(allIngredients[i].value);
    }
  }

  var name = document.getElementById('name').value;
  var description = document.getElementById('description').value;
  var recipe = { name, ingredients, description };
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
