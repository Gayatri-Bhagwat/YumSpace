import { useDispatch } from "react-redux"
import "../Dialog/Dialog.css"
import { MdDelete } from "react-icons/md";
import { hideDialog } from "../../features/showDialogBox/showDialogSlice";

export default function Dialog({ message }: { message: string }) {
    const dispatch = useDispatch()
    return <div className="ConfirmBox">
        <MdDelete style={{ fontSize: '2rem', color: '#e8773d', marginBottom: '8px' }} />
        <h3>Delete {message}?</h3>
        <p>This action cannot be undone. The recipe will be permanently removed.</p>
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
