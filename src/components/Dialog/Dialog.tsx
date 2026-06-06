import { useDispatch } from "react-redux"
import "../Dialog/Dialog.css"
import { hideDialog } from "../../features/showDialogBox/showDialogSlice";
import { IoWarningOutline } from "react-icons/io5";
import { deleteRecipe } from "../../features/addRecipe/addRecipeSlice";
import { useNavigate } from "react-router-dom";
import type { MyFormValues } from "../../Enums/FormFields";
import { deleteExistingRecipe } from "../../services/APIService";


export default function Dialog({ message, recipe }: { message: string, recipe: MyFormValues }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onDeleteRecipe = async () => {
        dispatch(deleteRecipe(recipe.title))
        const response = await deleteExistingRecipe(recipe.id)
        if (response.status === 204){
            navigate('/home')
        }
    }
    return <div className="ConfirmBox">
        <div className="ConfirmBoxHeader">
            <IoWarningOutline className="WarningIcon" size="4rem" />
            <span>Delete Recipe</span>
        </div>
        <h3>{message} <span style={{ color: "#ff6200" }}>"{recipe.title}"</span>?</h3>
        <p>This action cannot be undone. All recipe data, including ingredients and
            instructions will be permanently removed.</p>
        <div className="ConfirmActions">
            <button className="CancelBtn" onClick={() => (dispatch(hideDialog()))}>
                Cancel
            </button>
            <button className="DeleteBtn" onClick={onDeleteRecipe}>
                Yes, delete
            </button>
        </div>
    </div>
}
