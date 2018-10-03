const express = require('express');
const bodyParser = require('body-parser');
var firebase = require("firebase-admin");
var firebaseServiceAccount = require("./service-key.json");

const app = express();
//const router = express.Router();
app.use(bodyParser.json())

firebase.initializeApp({
    credential: firebase.credential.cert(firebaseServiceAccount),
    databaseURL: "https://angular-firebase-storage-b50a7.firebaseio.com"
});

let notesdb = firebase.database();
let ref = notesdb.ref("Notes");

// logging for reference
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.numChildren());
});

// api for adding note
app.post('/api/note/add', (req, res) => {

    var note_id = ref.push().key;
    var notesRef = ref.child(note_id);
    noteObj = req.body

    notesRef.set(noteObj).then(note => {
        console.info(note)
        res.json({ success: true, message: 'Note saved.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
});



// api for updating note
app.put('/api/note/:note_push_id', (req, res) => {

    note_uid = req.params.note_push_id;
    noteObj = req.body;

    ref.child(note_uid).update(noteObj).then(note => {
        console.info(note)
        res.json({ success: true, message: 'Note Updated.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
});

// api for delete note
app.delete('/api/note/:note_push_id', (req, res) => {

    note_uid = req.params.note_push_id;

    ref.child(note_uid).remove().then(note => {
        console.info(note)
        res.json({ success: true, message: 'Note Deleted.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
});

// api for getting all notes
app.get('/api/note/all', (req, res) => {

    let notes_array = []
    var query = ref.orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childData = childSnapshot.val();
                notes_array.push(childData)
            });
            console.info(notes_array)
            res.json(notes_array);

        }).catch(error => {
            res.json({ success: false, message: error.message });
        });
});


//api  for edit data

const port = 4000;

app.listen(port, () => {
    console.log('Server started at port ' + port);
});

/* var note_id = ref.push().key;
var notesRef = ref.child(note_id);
notesRef.set({
    Note: 'take some banana',
    full_name: "sobhit"
}); */