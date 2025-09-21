// ==================================
// Header: App title and subtitle with gradient hero style.
// Sets the stage with a modern look.
// ==================================

export default function Header() {
  return (
    <header className="px-6 pt-12 pb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-600 text-white rounded-2xl shadow-lg">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
         Text Generator
      </h1>
      <p className="mt-3 max-w-3xl mx-auto text-base md:text-lg opacity-90">
        Generate realistic machine-made text from files, URLs, or pasted text.
        Configure order, sentence starts, punctuation stopping, and reproducibility.
      </p>
    </header>
  );
}
