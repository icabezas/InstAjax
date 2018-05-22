



$(document).ready(function () {
    initializeFB();
    var auth = firebase.auth();
    //LOGIN   
    var btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', login);
    //LOGOUT

});
function initializeFB() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBkOr0hvzxlnGzaNrAui8lfeKzWsF8kSSU",
        authDomain: "pr7-ajax-cordova.firebaseapp.com",
        databaseURL: "https://pr7-ajax-cordova.firebaseio.com",
        projectId: "pr7-ajax-cordova",
        storageBucket: "pr7-ajax-cordova.appspot.com",
        messagingSenderId: "603739615144"
    };
    firebase.initializeApp(config);
}

function login() {
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var email = txtEmail.value;
    var password = txtPassword.value;
    var promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    var state = checkAuthState();
    console.log("state: " + state);
}

function checkAuthState() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            alert("Bienvenido")
            window.location = './authenticatedUser.html';
        } else {
            console.log('not logged in');
        }
    });
}

function createUser() {
    var pass1 = $('#password').val();
    var pass2 = $('#password2').val();
    if (pass1 == pass2) {
        if (pass1.length >= 6) {
            var email = $('#username').val();
            firebase.auth().createUserWithEmailAndPassword(email, pass1).catch(function (error) {
// Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                alert(errorMessage);
            });
            alert("Registro completo");
            setTimeout(function () {
                window.location = './login.html';
            }, 3000);
        } else {
            alert("La contraseña debe ser mayor de 6 carácteres");
        }
    } else {
        alert("Las contraseñas no coinciden");
    }
    console.log('pass1: ' + pass1);
}


function capture() {
//setup camera options
    var cameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    };

    Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
}