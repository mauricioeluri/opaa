declare namespace App {
  interface Locals {
    /** Content of the NGO for this page view (see `src/middleware.ts`). */
    content: import('./lib/api').ContentSource
    /** Set when the API could not be read; the 500 page answers 503 then. */
    contentError?: import('./lib/api').ContentUnavailableError
  }
}
