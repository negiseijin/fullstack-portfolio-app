export default function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/your-github"
            rel="noreferrer"
            target="_blank"
          >
            your-name
          </a>
          . The source code is available on{' '}
          <a
            className="font-medium underline underline-offset-4"
            href="https://github.com/your-github/your-repo"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
