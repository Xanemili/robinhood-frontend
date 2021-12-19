import * as yup from 'yup';

export interface UserProfile<T> {
    [key: string] : T
    email: T
    address: T
    zipcode: T
    firstName: T
    lastName: T
    username: T
}

export type ValidInput<T> = {
  value: T
  touched: boolean
  isValid?: boolean
  inputHelperText?: string
}

export type ProfileActions = { type: 'updateField', field: string , data: string }
                    | { type: 'resetField', field: string }
                    | { type: 'resetFields', fields: string[]}
                    | { type: 'resetForm', field: null}
                    | { type: 'loadUser', data: UserProfile<string> }
                    | { type: 'touchFieldValid', field: string }
                    | { type: 'touchFieldInvalid', field: string, data: any}

const initialStrInput: ValidInput<string> = { value: '', touched: false, }

export const initialProfile: UserProfile<ValidInput<string>> = {
  email: initialStrInput,
  address: initialStrInput,
  zipcode: initialStrInput,
  firstName: initialStrInput,
  lastName: initialStrInput,
  username: initialStrInput,
  password: initialStrInput,
  confirmPassword: initialStrInput
}

export const profileReducer = (state: UserProfile<ValidInput<string>>, action: ProfileActions): UserProfile<ValidInput<string>> => {
  switch (action.type) {
    case 'touchFieldValid':
      return { ...state, [action.field]: { ...state[action.field] , touched: true, isValid: true, inputHelperText: undefined } }
    case 'touchFieldInvalid':
      return { ...state, [action.field]: { ...state[action.field] , touched: true, isValid: false, inputHelperText: action.data } }
    case 'loadUser':
      const newProfile = { ...state }
      Object.keys(action.data).forEach((key) => {
        if(key in newProfile) {
          newProfile[key] = { touched: false, value: action.data[key] }
        }
      })
      return newProfile
    case 'updateField':
      return { ...state, [action.field]: { ...state[action.field] ,value: action.data }}
    case 'resetField':
      return { ...state, [action.field]: { ...state[action.field], value: '', touched: false }}
    case 'resetFields':
      const new_state = {...state}
      for (const field in action.fields) {
        new_state[field] = {...state[field], value: '', touched: false, inputHelperText: '', isValid: undefined}
      }
      return new_state
    case 'resetForm':
      return initialProfile
    default:
      return state
  }
}

const passwordSchema = yup.string().min(8).max(24).trim().ensure().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {excludeEmptyString: true, message: 'Passwords must be contain a lowercase, an uppercase, a number, and a special character'})

export const profileSchema: yup.SchemaOf<UserProfile<ValidInput<string>>> = yup.object().shape({
  username: yup.string().required().min(4).max(24).ensure().trim(),
  email: yup.string().required().email(),
  address: yup.string().required().max(100).trim(),
  firstName: yup.string().required().max(50),
  lastName: yup.string().required().max(50),
  state: yup.string().notRequired().max(2),
  zipcode: yup.string().notRequired().trim().max(5),
  phone: yup.string().notRequired().min(10).max(10),
  // password: passwordSchema.label('Password'),
  // confirmPassword: yup.string().label('Confirm Password').when('Password', {
  //   is: true,
  //   then: passwordSchema
  //         .oneOf([yup.ref('password'), null], 'Passwords must match'),
  //   otherwise: passwordSchema
  // }),
}).defined()
