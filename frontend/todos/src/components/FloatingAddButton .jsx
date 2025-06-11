// src/components/FloatingAddButton.jsx
const FloatingAddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg text-center hover:bg-blue-700"
    >
      +
    </button>
  );
};

export default FloatingAddButton;
