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

  var train = 0;
  // var trainName = "";
  // var destination = "";
  // var firstTrainTime = 0;
  // var frequency = 0;

  database.ref().on("value", function(snapshot) {
    var train1 = snapshot.val().train1;
    $("#addCurrentTrain").html(train1.destination + "<br>" + train1.firstTrainTime + "<br>" + train1.frequency + "<br>" + train1.trainName);
  });

  /*
  database.ref().set({
      train = 1
  });
  */
  // database.ref().child('train')