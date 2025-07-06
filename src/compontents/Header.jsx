
function Header() {
  return (
    <div className="w-full rounded-sm flex flex-row text-2xl gap-12 text-center justify-center">
      <a className="hover:underline" href="/">Home</a>
      <a className="hover:underline" href="/portfolio">Portfolio</a>
      <a className="hover:underline" href="/blog">Blog</a>
      <a className="hover:underline" href="https://github.com/alessiorw/">Github</a>

    </div>
  )
}

export default Header