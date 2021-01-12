import commonPartials from './partials.js';
import {
  setHeader
} from './auth.js';
import {
  create,
  get,
  update,
  close,
  getAll
} from '../models/events.js';

export function getCreate(context) {
  setHeader(context)
  context.loadPartials(commonPartials).partial('../templates/functional/create.hbs')
}
export function postCreate(context) {
  const {
    meal,
    ingredients,
    prepMethod,
    description,
    foodImageURL,
    category,
    cookScale
  } = context.params;
  let ingrArr = ingredients.split(', ').map(x => x = {
    ingr: x
  });
  let ingrToPreview = ingredients.split(', ').slice(0, 2).map(x => x = {
    ingrToPrv: x
  });
  let creator = sessionStorage.getItem('user');
  let stars = `★`.repeat(Number(cookScale));
  let whiteStars = `★`.repeat(Number(10 - cookScale));

  if (validateInput(meal, ingrArr, prepMethod, description, foodImageURL, category)) {
    create({
        meal,
        stars,
        whiteStars,
        ingredients,
        ingrToPreview,
        ingrArr,
        prepMethod,
        description,
        foodImageURL,
        category,
        likesCounter: 0,
        creator
      })
      .then(res => {
        notify('Recipe shared successfully!', 'successBox')
        timeout(this, 'home')
      })
  }

}
export function getDetails(context) {
  setHeader(context)

  const {
    id
  } = context.params;

  get(id)
    .then(res => {
      let currRecipe = {
        ...res.data(),
        id
      };

      context.currRecipe = currRecipe;
      let isCreator = currRecipe.creator === sessionStorage.getItem('user')
      context.isCreator = isCreator;

      context.loadPartials(commonPartials).partial('../templates/functional/details.hbs');

    })

}
export function getEdit(context) {
  setHeader(context)

  const {
    id
  } = context.params;
  get(id)
    .then(res => {
      let currRecipe = {
        ...res.data(),
        id
      };
      context.currRecipe = currRecipe;

      context.loadPartials(commonPartials).partial('../templates/functional/edit.hbs');

    })
}
export function postEdit(context) {
  const {
    meal,
    ingredients,
    prepMethod,
    description,
    foodImageURL,
    category,
    cookScale
  } = context.params;
  let ingrArr = ingredients.split(', ').map(x => x = {
    ingr: x
  })
  const {
    id
  } = context.params;
  let stars = `★`.repeat(Number(cookScale));
  let whiteStars = `★`.repeat(Number(10 - cookScale));

  if (validateInput(meal, ingrArr, prepMethod, description, foodImageURL, category)) {
    update(id, {
        meal,
        ingredients,
        ingrArr,
        prepMethod,
        description,
        foodImageURL,
        category,
        stars,
        whiteStars
      })
      .then(res => {
        notify('Recipe edited successfully!', 'successBox')
        timeout(this, `#/details/${id}`);
      })
  }


}
export function getArchive(context) {
  const {
    id
  } = context.params;

  close(id)
    .then(res => {
      notify('Your recipe was archived.', 'successBox')
      timeout(this, 'home');
    })
}
export function getLike(context) {

  const {
    id
  } = context.params;

  get(id)
    .then(res => {
      let currRecipe = res.data();

      const likesCounter = currRecipe.likesCounter + 1;
      update(id, {
        likesCounter
      });

      notify('You liked that recipe.', 'successBox');
      timeout(this, 'home');
    })

}
export function getRecipes(context) {
  setHeader(context);

  context.loadPartials(commonPartials).partial('../templates/functional/recipes.hbs');
}

// .then(data=> console.log(data.docs[1].data())) // така се достъпва инфо за рецептата

export function getVeggiesRecipes(context) {
  setHeader(context)

  getAll()
    .then(res => {
      let recipes = res.docs.map(recipe => recipe = {
        ...recipe.data(),
        id: recipe.id
      });
      recipes = recipes.filter(recipe => recipe.category.startsWith('Vegetables'))
      context.recipes = recipes;
      context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
    })
}
export function getGrainRecipes(context) {
  setHeader(context)
  getAll()
    .then(res => {
      let recipes = res.docs.map(recipe => recipe = {
        ...recipe.data(),
        id: recipe.id
      });
      recipes = recipes.filter(recipe => recipe.category.startsWith('Grain'))
      context.recipes = recipes;
      context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
    })
}
export function getFruitsRecipes(context) {
  setHeader(context)

  getAll()
  .then(res => {
    let recipes = res.docs.map(recipe => recipe = {
      ...recipe.data(),
      id: recipe.id
    });
    recipes = recipes.filter(recipe => recipe.category.startsWith('Fruits'))
    context.recipes = recipes;
    context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
  })
}
export function getMilkRecipes(context) {
  setHeader(context)

  getAll()
  .then(res => {
    let recipes = res.docs.map(recipe => recipe = {
      ...recipe.data(),
      id: recipe.id
    });
    recipes = recipes.filter(recipe => recipe.category.startsWith('Milk'))
    context.recipes = recipes;
    context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
  })
}
export function getMeatsRecipes(context) {
  setHeader(context)

  getAll()
  .then(res => {
    let recipes = res.docs.map(recipe => recipe = {
      ...recipe.data(),
      id: recipe.id
    });
    recipes = recipes.filter(recipe => recipe.category.startsWith('Lean'))
    context.recipes = recipes;
    context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
  })
}
export function getFishRecipes(context) {
  setHeader(context)

  getAll()
  .then(res => {
    let recipes = res.docs.map(recipe => recipe = {
      ...recipe.data(),
      id: recipe.id
    });
    recipes = recipes.filter(recipe => recipe.category.startsWith('Fish'))
    context.recipes = recipes;
    context.loadPartials(commonPartials).partial('../templates/functional/recipeSpecific.hbs');
  })
}

// ГОТОВО ЗА EXAM!!!

function validateInput(meal, ingredients, prepMethod, description, foodImageURL, category) {
  if (meal.length >= 4 && ingredients.length >= 2 && prepMethod.length >= 10 && description.length >= 10 && (foodImageURL.startsWith('http://') || foodImageURL.startsWith('https://') && categories.includes(category))) {
    return true;
  } else {
    return false;
  }
}
export function notify(message, notifId) {

  let notifElement = document.getElementById(notifId);
  notifElement.textContent = message;
  notifElement.style.display = 'block';
}
export function timeout(context, page) {
  return setTimeout(() => {
    context.redirect(`#/${page}`);
  }, 1000);
}
let categories = ['Vegetables and legumes/beans', 'Fruits', 'Grain Food', 'Milk, cheese, eggs and alternatives', 'Lean meats and poultry', 'Fish'];