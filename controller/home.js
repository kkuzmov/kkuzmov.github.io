import { getAll } from '../models/events.js';
import { setHeader } from './auth.js';
import commonPartials from './partials.js';

export function getHome(context) {
        setHeader(context)
        getAll()
        .then(res =>{
                let recipes = res.docs.map(recipe => recipe = {...recipe.data(), id: recipe.id});
                recipes.length > 0 ? context.recipes = true : context.recipes = false;

                context.vegetables = recipes.filter(rec => rec.category.startsWith('Vegetables'));
                context.meatsFish = recipes.filter(rec => rec.category.startsWith('Lean'));
                context.fruits = recipes.filter(rec => rec.category.startsWith('Fruits'))
                context.grain = recipes.filter(rec => rec.category.startsWith('Grain'))
                context.milk = recipes.filter(rec => rec.category.startsWith('Milk'))        

                context.loadPartials(commonPartials).partial('../templates/user/home.hbs');
        })
}
export function searchMeal(context){
        console.log(context.params.searchQuery)
}