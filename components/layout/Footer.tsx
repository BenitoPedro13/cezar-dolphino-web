export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
          © {new Date().getFullYear()} Cezar Dolphino
        </p>
        <div className="flex gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            YouTube
          </a>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Spotify
          </a>
        </div>
      </div>
    </footer>
  )
}
