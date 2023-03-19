import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    client : { toggleForm : false, formId: undefined, deleteId : null}
}

export const ReducerSlice = createSlice({
    name: 'crudapp',
    initialState,
    reducers : {
        toggleChangeAction : (state) => {
            console.log("TOGGLLE ACTION KI CALL HOCCHE?")
            state.client.toggleForm = !state.client.toggleForm
        },
        updateAction : (state, action) => {
            console.log("TOGGLLE UPDATE KI CALL HOCCHE?")
            state.client.formId = action.payload
            console.log("**********"+action.payload)
            console.log(state.client.formId)
        },
        deleteAction : (state, action) => {
            state.client.deleteId = action.payload
        }
    }
})

export const { toggleChangeAction, updateAction, deleteAction } = ReducerSlice.actions

export default ReducerSlice.reducer;