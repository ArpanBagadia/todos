const Note = require('../models/noteModel')

const createNote = async (req, res) => {
    const { title, content, tags } = req.body;
    if (!title) return res.status(400).json({
        msg: "Title is required"
    })
    try {
        const note = new Note({
            title,
            content,
            tags,
            userId: req.user.id
        })
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }
    catch (err) {
        res.status(500).json({
            msg: "Error saving note"
        })
    }
}


const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ pinned: -1,date: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes" });
    }
};

const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        const deleteNote = await Note.findOneAndDelete({
            _id: noteId,
            userId: req.user.id
        });

        if (!deleteNote) {
            return res.status(404).json({ msg: "Note not found" });
        }

        res.status(200).json({ msg: "Note deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to delete note" });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, pinned } = req.body
    try {
        const update = await Note.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { title, content, tags, pinned },
            { new: true }
        )
        if (!update) return res.status(404).json({ msg: "Note not found" });
        res.status(200).json({ msg: "Note updated", note: update });
    }
    catch (error) {
        res.status(500).json({ msg: "failed to update note" })
    }
}
module.exports = { createNote, getNotes, deleteNote, updateNote }