// This file contains function to validate the input of the user while loging in or redistering

const regularExpression =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export default function validEmail(email) {
    let valid = false;
    if (
        email.includes("@") &
        (email.indexOf("@") > 2) &
        (email.length - email.indexOf("@") > 5)
        ) {valid = true;}
    return valid;
}

export function validPassword(password){
    let valid = true;
    if (!regularExpression.test(password) || password.length < 6) {
        valid= false
    }
    return valid;
};

export function validName(name){
    let valid = false;
    if (name.length > 3){
        valid = true
    }
    return valid;
};

