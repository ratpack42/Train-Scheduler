 // Initialize Firebase
  var config = {
  apiKey: "AIzaSyAYad269Ehp4edrswaVnPC0teJfz_tp4d8",
    authDomain: "train-choo-choo.firebaseapp.com",
    databaseURL: "https://train-choo-choo.firebaseio.com",
    projectId: "train-choo-choo",
    storageBucket: "train-choo-choo.appspot.com",
    messagingSenderId: "506991876198"
};


// Show current time
var datetime = null,
date = null;

var update = function () {
  date = moment(new Date())
  datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
  datetime = $('#current-status')
  update();
  setInterval(update, 1000);
});

firebase.initializeApp(config);

var trainData = firebase.database();

  // Capture Button Click
    $("#addTrainBtn").on("click", function(){
  
  //Initialize Values
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = moment($("#firstTrain").val().trim(),"HH:mm").subtract(10,"years").format("x");
      var frequency = $("#frequency").val().trim();


      var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
      }

      trainData.ref().push(newTrain);

      alert("Train Added");

      $("#trainName").val("");
      $("#destination").val("");
      $("firstTrain").val("");
      $("frequency").val("");

      return  false;

    })

    trainData.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var destination = snapshot().destination;
      var frequency = snapshot().frequency;
      var firstTrain = snapshot().firstTrain;

    })


  



