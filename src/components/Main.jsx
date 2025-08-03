import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"
export default function Main(){

    const [ingredients, setIngredients] =React.useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
    const [recipe,setRecipe]=React.useState("")
    const recipeSection=React.useRef(null)
    React.useEffect(()=>{
        if (recipe !== "" && recipeSection.current !== null ){
             recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
    },[recipe])

    function addIngredient(formData){

            const newIngredient=formData.get("ingredient")
            setIngredients(prevIngredients=>[
                ...prevIngredients,
                newIngredient
            ])   
        }

    async function getRecipe() {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)

    }

    return(

        <main>

            <form action={addIngredient} className="add-ingredient-form"  >
                <input placeholder="e.g. oregano" aria-label="Add ingredient" type="text" name="ingredient"/>
                <button >Add ingredient</button>
            </form>
            {ingredients.length>0 && 
                    <IngredientsList 
                      ref={recipeSection}
                      ingredients={ingredients}
                      getRecipe={getRecipe}
                    />
            }
            {recipe && <ClaudeRecipe recipe={recipe} />}
            
        </main>
    )
}