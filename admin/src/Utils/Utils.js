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

export function checkEmptyInput(input){
    if (input.length < 3){
        return true
    }; return false;
}

export function checkInputIsNumber(input){
    if (input.length == 0 && isNaN(input)){
        return false
    }; return true;
}

export function checkInputIsLevel(input){
    if (input == 'hard' || input == 'easy' || input == 'medium'){
        return true
    }; return false;
}

export function getBase64(file, cb){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      cb(reader.result);
    }
    reader.onerror = function(err){ console.log(err)}
}