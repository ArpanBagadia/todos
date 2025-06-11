import { useEffect, useState } from "react";

const AddNoteModal = ({ onClose, onSave, edit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (edit) {
            setTitle(edit.title);
            setContent(edit.content);
            if (Array.isArray(edit.tags)) {
                setTags(edit.tags);
            } else if (typeof edit.tags === "string") {
                setTags(edit.tags.split(" ").filter(tag => tag.trim() !== ""));
            } else {
                setTags([]);
            }
        }
        else {
            setTitle("");
            setContent("");
            setTags([]);
        }
    }, [edit])

    const handleAddTag = () => {
        if (tagInput.trim()) {
            const formattedTag = tagInput.trim().startsWith("#") ? tagInput.trim() : `#${tagInput.trim()}`;
            setTags([...tags, formattedTag]);
            setTagInput("");
        }
    };

    const handleSubmit = () => {
        const noteData = { title, content, tags: tags.join(" ") };
        onSave(noteData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Note</h2>
                    <button onClick={onClose} className="text-gray-500 text-lg">×</button>
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded mb-3 h-32 resize-none"
                ></textarea>

                <div className="mb-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add tag"
                            className="flex-1 border p-2 rounded"
                        />
                        <button
                            onClick={handleAddTag}
                            className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {edit ? "UPDATE" : "ADD"}
                </button>
            </div>
        </div>
    );
};

export default AddNoteModal;
