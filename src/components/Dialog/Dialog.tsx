import { useDispatch } from "react-redux"
import "../Dialog/Dialog.css"
import { hideDialog } from "../../features/showDialogBox/showDialogSlice";
import { IoWarningOutline } from "react-icons/io5";


export default function Dialog({ message, recipeTitle }: { message: string, recipeTitle: string }) {
    const dispatch = useDispatch()
    return <div className="ConfirmBox">
        <div className="ConfirmBoxHeader">
            <IoWarningOutline  className="WarningIcon" size="4rem"/>
            <span>Delete Recipe</span>
        </div>
        <h3>{message} <span style={{color:"#ff6200"}}>"{recipeTitle}"</span>?</h3>
        <p>This action cannot be undone. All recipe data, including ingredients and 
            instructions will be permanently removed.</p>
        <div className="ConfirmActions">
            <button className="CancelBtn" onClick={() => (dispatch(hideDialog()))}>
                Cancel
            </button>
            <button className="DeleteBtn" onClick={() => {
            }}>
                Yes, delete
            </button>
        </div> 
    </div>
}
