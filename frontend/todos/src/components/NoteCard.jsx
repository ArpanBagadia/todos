import { useState } from 'react';
import { FaTrash, FaEdit, FaThumbtack } from 'react-icons/fa';

const NoteCard = ({ title, date, content, tag, onDelete, _id, onEdit, pinned, onPin }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-[350px] relative transition-transform hover:scale-105 flex flex-col justify-center">
      {/* Pin icon */}
      <div
        className={`absolute top-3 right-3 cursor-pointer text-lg ${pinned ? "text-blue-600" : "text-gray-400"}`}
        onClick={() => onPin(_id, !pinned)}
      >
        <FaThumbtack />
      </div>

      {/* Note Content */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-sm text-gray-700 mb-2">{content}</p>
        <p className="text-sm text-blue-500 font-medium">{tag}</p>
      </div>

      {/* Icons aligned nicely */}
      <div className="flex justify-end gap-4 mt-auto pt-2 border-t">
        <button title="Edit" onClick={() => {
          onEdit({
            _id, title, content, tags: tag
          })
        }}>
          <FaEdit className="text-gray-600 hover:text-gray-800 text-[18px]" />
        </button>
        <button
          title="Delete"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this note?")) {
              onDelete(_id);
            }
          }}
        >
          <FaTrash className="text-red-500 hover:text-red-700 text-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
