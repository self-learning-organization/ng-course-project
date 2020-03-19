import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
};

export function authReducer(
        state = initialState, 
        action: AuthActions.AuthActions
    ) {
    console.log(state);
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: user // Can also be simply user in this case because both the variable name and the property name are the same
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}