import NoteCard from '../components/NoteCard';
import FloatingAddButton from '../components/FloatingAddButton ';
import AddNoteModal from '../components/AddNoteModal';
import axios from 'axios'
import { useState } from 'react';
import toast from 'react-hot-toast';

const Home = ({ searchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNotes] = useState([]);
  const [edit, setEdit] = useState(null);
  const filteredNotes = note.filter(n =>
    n.title.toLowerCase().includes(searchQuery) ||
    n.content.toLowerCase().includes(searchQuery) ||
    (Array.isArray(n.tags) ? n.tags.join(" ").toLowerCase() : "").includes(searchQuery)
  );
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/user/getNote", {
      headers: { Authorization: `Bearer ${token}` }
    })
    setNotes(res.data)
  }
  useState(() => {
    fetchNotes()
  }, []);
  const handleSaveNote = async (notes) => {
    const token = localStorage.getItem("token");

    try {
      if (edit) {
        await axios.put(`http://localhost:5000/user/updateNote/${edit._id}`, notes, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Note updated successfully!", {
          icon: "🔄"
        })
      } else {
        await axios.post("http://localhost:5000/user/createNote", notes, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Note added successfully!", {
          icon: "📝"
        });
      }
      setShowModal(false);
      setEdit(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/user/deleteNote/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
      toast.success("Note deleted successfully!", {
        icon: "🧹",
      });

    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleEditNote = async (note) => {
    setEdit(note)
    setShowModal(true)
  }
  const handlePin = async (id, newPinStatus) => {
    const token = localStorage.getItem("token")
    try {
      await axios.put(`http://localhost:5000/user/updateNote/${id}`, { pinned: newPinStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
      toast.success("Note pin!", {
        icon: "📌",
      });
    } catch (error) {
      console.error("Failed to pin note:", error);
    }
  }
  return (
    <div className="p-6">
      {showModal && (
        <AddNoteModal onClose={() => setShowModal(false)} onSave={handleSaveNote} edit={edit} />
      )}
      <div className="flex flex-wrap gap-6 justify-around">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              {...note}
              title={note.title}
              date={new Date(note.date).toLocaleString('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
              content={note.content}
              tag={note.tags}
              _id={note._id}
              pinned={note.pinned}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
              onPin={handlePin}
            />
          ))}
        </div>
        <FloatingAddButton onClick={() => setShowModal(true)} />
      </div>
    </div>
  );
};

export default Home;
