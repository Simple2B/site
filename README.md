## Getting Started

First, run the development server:

```bash
cd frontend/

cp sample.env .env

docker-comppose up -d

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Run and Deploy with Docker

The project can be runs under docker. Please use following command to start server in folder with _docker-compose.yaml_ file:

```bash
docker-compose build
docker-compose up -d
```

Stop server:

```bash
docker-compose down
```

If default port _3000_ is busy by another server - create file **.env** for example:

```
APP_LOCAL_PORT=3030
```

## Project Versioning

For incrementing the project version use the following command:

```bash
./site-version.sh [patch, minor, major]
```

This command automatically increments the version in _front/package.json_ and _back/pyproject.toml_ files and creates git tag with the version name. GitHub action _.github/workflows/build-deploy.yml_ automatically deploys the project to the develop server.

if you use git submodule use this command to pull submodule

```
git submodule update --init --recursive
```
