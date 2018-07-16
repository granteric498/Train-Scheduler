var config = {
    apiKey: "AIzaSyDy1I4CWuctYGcW3EvC_zLH53_GC-uekeA",
    authDomain: "train-scheduler-97695.firebaseapp.com",
    databaseURL: "https://train-scheduler-97695.firebaseio.com",
    projectId: "train-scheduler-97695",
    storageBucket: "train-scheduler-97695.appspot.com",
    messagingSenderId: "691178289160"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding trains
$("#submitButton").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#inputName").val().trim();
  var trainDestination = $("#inputDestination").val().trim();
  var trainTime = moment($("#inputTime").val().trim(), "hh:mm a").format("HH:mm");
  var trainFrequency = $("#inputFrequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    startTime: trainTime,
    frequency: trainFrequency
  };

  // Uploads train data to database
  database.ref().push(newTrain);

  // Clears all text-boxes
  $("#inputName").val("");
  $("#inputDestination").val("");
  $("#inputTime").val("");
  $("#inputFrequency").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().startTime;
  var currentTime = moment().format('HH:mm');
  var trainFrequency = childSnapshot.val().frequency;

  // Convert the First Train Time into Next Arrival
  // Difference in time between First Train Time and now
  var difference = moment.utc(moment(currentTime,"HH:mm").diff(moment(trainTime,"HH:mm"))).format("HH:mm");
  // Converted in minutes
  var convertedToMinutes = moment.duration(difference, "HH:mm").asMinutes();
  // Remainder of time left over, which = how many minutes ago was last train
  var remainder = convertedToMinutes % trainFrequency;
  // Converts time from last train into time for next train
  var minutesAway = trainFrequency - parseInt(remainder);
  // Adding the arrival to now will create the next arriving time
  var nextArrival = moment().add(minutesAway, 'minutes').calendar();

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
  
  var ref = firebase.database().ref('train-scheduler-97695');
  ref.orderByChild('name').equalTo(childSnapshot.val().name).on("value", function(snapshot) {
    console.log((childSnapshot.key));
  });
});