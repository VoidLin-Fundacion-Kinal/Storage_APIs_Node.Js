
import {
    isValidObjectId
} from 'mongoose'


import User from '../src/User/user.model.js'
import Provider from '../src/Provider/provider.model.js'
import Products from '../src/Products/products.model.js'

/* Observación: Identificar en Español el 
validador, para evitar problemas a futuros. */


//Validar si el Username(Usuario) existe
export const existUsername = async(username, user) => {
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user._id){
        console.error(`Username ${username} is already taken`)
        throw new Error (`Username ${username} is already taken`);
    }
}

//Validar si el Email(Correo) existe
export const existEmail = async(email, user) => {
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user._id){
        console.error(`Email ${email} is already taken`)
        throw new Error (`Email ${email} is already taken`);
    }
}

//No requiere el campo lleno
export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}


//Validar si el ID es válido
export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

//Validaciones para proveedor
export const emailExistProvider = async (email) => {
    const exists = await Provider.findOne({ email });
    if (exists) {
        throw new Error('Email already in use');
    }
    return true;
}

export const nameExistProvider = async (name) => {
    const exists = await Provider.findOne({ name });
    if (exists) {
        throw new Error('Provider name already exists');
    }
    return true;
}

export const providerExists = async (id) => {
    const provider = await Provider.findById(id);
    if (!provider) throw new Error('Provider not found');
    return true;
}

// Check if product name already exists
export const productNameExists = async (name) => {
    const product = await Products.findOne({ name })
    if (product) throw new Error('Product name already exists')
    return true
}

// Check if product exists by ID
export const productExists = async (id) => {
    const product = await Products.findById(id)
    if (!product) throw new Error('Product not found')
    return true
}

export const deleteFrom = async (id) => {
    const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return true;
    }