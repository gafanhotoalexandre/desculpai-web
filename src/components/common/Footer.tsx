export function Footer() {
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-medium text-sm">
        <p>
          &copy; {new Date().getFullYear()} desculp.ai — Todos os direitos
          reservados
        </p>
      </div>
    </footer>
  )
}
