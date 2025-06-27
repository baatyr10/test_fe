export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4 flex justify-center">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Поиск фильмов"
        className="w-full max-w-2xl border p-2 rounded shadow-sm"
      />
    </form>
  );
}
