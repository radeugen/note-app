const mongoose = require(`mongoose`);
const config = require(`../../etc/config`);
// import '../models/note';
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {type: String},
    text: {type: String, required: true},
    color: {type: String},
    createdAt: {type: Date}
});


const Note = mongoose.model('Note', NoteSchema);

module.exports = {
    setUpConnection() {
        mongoose.connect(`mongodb://${config.db.user}:${config.db.pass}@${config.db.host}:${config.db.port}/${config.db.name}`);
    },

    listNotes() {
        return Note.find()
    },

    createNote(data) {
        const note = new Note({
            title: data.title,
            text: data.text,
            color: data.color,
            createdAt: new Date()
        });

        return note.save();
    },

    deleteNote(id) {
        return Note.findById(id).remove();
    }

};

/*export function setUpConnection() {
    mongoose.connect(`mongodb://noteapp:noteapp11@ds119060.mlab.com:19060/note-app`);
}

export function listNotes() {
    return Note.find();
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}*/
