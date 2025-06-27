const genres = [
  'Комедия', 'Боевик', 'Фантастика', 'Драма', 'Мультфильмы',
  'Ужасы', 'Триллер', 'Романтика',
];

export default function GenreGrid() {
  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-2">Жанры</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {genres.map((genre, idx) => (
          <div key={idx} className="bg-black text-white rounded p-4 text-center opacity-80 hover:opacity-100 transition">
            {genre}
          </div>
        ))}
      </div>
    </section>
  );
}
