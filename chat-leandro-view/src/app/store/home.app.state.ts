import { createAction, createReducer, props } from "@ngrx/store";
import { Message } from "../model/message.model";
import { User } from "../model/user.model";

export interface IHomeState{
    message : Message[];
    user : User[];
}

export const homeInitialState: IHomeState = {
    message: [],
    user : []
}

export const createNewUser = createAction('[App] create a new user.', props<{payload:User}>)

export const appReducer = createReducer(
    homeInitialState
)