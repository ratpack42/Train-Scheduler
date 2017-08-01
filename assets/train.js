 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAYad269Ehp4edrswaVnPC0teJfz_tp4d8",
    authDomain: "train-choo-choo.firebaseapp.com",
    databaseURL: "https://train-choo-choo.firebaseio.com",
    projectId: "train-choo-choo",
    storageBucket: "",
    messagingSenderId: "506991876198"
};
firebase.initializeApp(config);

var dataRef = firebase.database().ref();

// Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var currentTime = moment();


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

  // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime = $("#firstTrainTime").val().trim();
      frequency = $("#frequency").val().trim();

      // Code for the push
      dataRef.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().joinDate);

      // full list of items to the well
      $("#trainAdded").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        " </span><span id='destination'> " + childSnapshot.val().destination +
        " </span><span id='firstTrainTime'> " + childSnapshot.val().firstTrainTime +
        " </span><span id='frequency'> " + childSnapshot.val().frequency + " </span></div>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Change the HTML to reflect
      $("#trainName").html(snapshot.val().trainName);
      $("#destination").html(snapshot.val().destination);
      $("#firstTrainTime").html(snapshot.val().firstTrainTime);
      $("#frequency").html(snapshot.val().frequency);
    });

      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

