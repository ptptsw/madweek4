function google_login(provider){
    $(document).on("click", "#google_login", function(){
        firebase.auth().signInWithPopup(provider).then(function(result){
        var token=result.credential.accessToken;
        var user= result.user;
        var ref= firebaseDatabase.ref("users/"+user.uid);
        var obj={name: "hihi"};
        ref.set(obj);
        alert("가입성공!");
        }).catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            var email=error.email;
            var credential=error.credential;
        });
    });
}

function sign_up(isAdduser){
    $(document).on("click", "#join", function(){
        var userInfo;
        var email=$("#email").val();
        var password = $("#pwd").val();
        isAdduser=true;
        firebaseEmailAuth.createUserWithEmailAndPassword(email, password).then(function (user){
            userInfo=user;
            var ref= firebaseDatabase.ref("users/"+user.uid);
            var obj={name: email};
            ref.set(obj);
            alert("가입성공!");
        }, function(error){
            var errorCode= error.code;
            var errorMessage=error.message;
            alert(errorMessage);
        });
    });
}



$(document).ready(function (){
    //firebase.analytics();
    var isAdduser=false;
    var firebaseConfig = {
      apiKey: "AIzaSyAQgCk9JBG5h_xJ2Zaoa7UrxOL3EQmo808",
      authDomain: "madweek4.firebaseapp.com",
      databaseURL: "https://madweek4.firebaseio.com",
      projectId: "madweek4",
      storageBucket: "madweek4.appspot.com",
      messagingSenderId: "462146617752",
      appId: "1:462146617752:web:0ca8ec8e02df517ed8ebed",
      measurementId: "G-L4MYBK22B1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebaseEmailAuth=firebase.auth();
    firebaseDatabase=firebase.database();

    var provider= new firebase.auth.GoogleAuthProvider();
    google_login(provider);
    sign_up(isAdduser);





    /*firebase.auth().onAuthStateChanged(function(user){
        if(user &&isAdduser){
            var ref= firebaseDatabase.ref("users/"+user.uid);
            var Email=$("#email").val();
            var Password = $("#pwd").val();
            var Name = $("#name").val();
            var obj={name: Name, email: Email};
            ref.set(obj);
            alert("가입성공");
        }
    });*/





});


