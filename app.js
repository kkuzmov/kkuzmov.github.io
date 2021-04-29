import { getCreate, postCreate, getDetails, getEdit, postEdit, getArchive, getLike, getRecipes, getVeggiesRecipes, getGrainRecipes, getFishRecipes, getFruitsRecipes,getMeatsRecipes, getMilkRecipes } from './controller/func.js';
import { getHome, searchMeal } from './controller/home.js';
import { getLogin, getLogout, getRegister, postLogin, postRegister } from './controller/user.js';



const app = Sammy('#rooter', function() {
    this.use('Handlebars', 'hbs') // !!!!!ЗАДЪЛЖИТЕЛНО!!!!!!!


    this.get('#/home', getHome);
    this.get('#/login', getLogin);
    this.get('#/create', getCreate);
    this.get('#/register', getRegister);
    this.get('#/logout', getLogout);
    this.get('#/create', getCreate);
    this.get('#/details/:id', getDetails);
    this.get('#/edit/:id', getEdit);
    this.get('#/archive/:id', getArchive);
    this.get('#/like/:id', getLike);
    this.get('#/recipes', getRecipes);
    this.get('#/vegetables-recipes', getVeggiesRecipes);
    this.get('#/grain-recipes', getGrainRecipes);
    this.get('#/fruits-recipes', getFruitsRecipes);
    this.get('#/milk-recipes', getMilkRecipes);
    this.get('#/meats-recipes', getMeatsRecipes);
    this.get('#/fish-recipes', getFishRecipes);
    
    
    
    
    this.post('#/search', searchMeal);
    this.post('#/create', postCreate);
    this.post('#/register', postRegister);
    this.post('#/login', postLogin);
    this.post('#/edit/:id', postEdit);
});
app.run('#/home');