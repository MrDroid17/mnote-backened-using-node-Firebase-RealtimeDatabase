const express = require('express');
const bodyParser = require('body-parser');
const Note = require('./model/notes')
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

// api for delete note
app.delete('/api/note/:note_push_id', (req, res) => {

    var note_id = ref.push().key;
    var notesRef = ref.child(note_id);
    noteObj = req.body

    notesRef.set(noteObj).then(note => {
        console.info(note)
        res.json({ success: true, message: 'Note delete.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
});

// api for updating note
app.put('/api/note/:note_push_id', (req, res) => {

    var note_id = ref.push().key;
    var notesRef = ref.child(note_id);

    note_uid = req.params.note_push_id;
    noteObj = req.body;

    notesRef.ref('Notes/' + note_uid).update(noteObj).then(note => {
        console.info(note)
        res.json({ success: true, message: 'Note Updating.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
});

// api for getting all notes
app.get('/api/note/all', (req, res) => {

    var note_id = ref.push().key;
    var notesRef = ref.child(note_id);

    noteObj = req.body;

    notesRef.set(noteObj).then(note => {
        console.info(note)
        res.json({ success: true, message: 'All note found.' });
    }).catch(error => {
        res.json({ success: false, message: error.message });
    })
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