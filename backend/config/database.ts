import path from "path";

export default ({ env }: { env: (key: string, fallback?: string) => string }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections: Record<string, object> = {
    sqlite: {
      connection: {
        // Use process.cwd() so the DB sits at the project root,
        // never inside dist/ (which gets wiped on every rebuild).
        filename: path.join(
          process.cwd(),
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env("DATABASE_PORT", "5432"),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl: env("DATABASE_SSL", "false") === "true"
          ? { rejectUnauthorized: false }
          : false,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env("DATABASE_CONNECTION_TIMEOUT", "60000"),
    },
  };
};
