export default ({ label, placeholder, type, onChange, value }) => {
  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        className="w-full p-2 border border-gray-400 rounded-lg"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};
