# Search API assignment

## Local setup

### Requirements

- You need a Node.js installation for starting locally. I only tested it on Node 20.10.0, on a Mac (Monterey 12.7.1).
- You need a valid API key for omdbapi.com.

### Local setup

- Create a file named `.env.local` in the project root directory, and set your OMDB API key there in the format indicated by the `.env.local.example` file.
- Run `npm i`.
- Run `npm run start-dev`. The UI should open in your browser automatically (at http://localhost:3000).

## Remarks

- There is no production deploy or configuration, only the dev start.
- The server reads and caches all file content on startup. This is quick and simple for a small amount of test data (i.e. a few thousand relatively small files), but obviously would not work for a much larger amount of data. But then we would need some real file content indexing anyway, and that did not seem to be part of the assignment.
