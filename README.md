# Estudio Scheifler & Asoc. — sitio web

Next.js 16 (App Router) + Tailwind CSS 3 + Prisma (PostgreSQL). Desplegado en Netlify.

## Variables de entorno

| Variable            | Para qué                                                                  |
| ------------------- | ------------------------------------------------------------------------- |
| `DATABASE_URL`      | Conexión a PostgreSQL (notas de prensa).                                  |
| `ADMIN_PASSWORD`    | Clave del panel `/admin`. Usar una larga (16+ caracteres).                |
| `ANTHROPIC_API_KEY` | Clave del chat IAn.                                                       |
| `ANTHROPIC_MODEL`   | Opcional. Modelo del chat (por defecto `claude-haiku-5-5`).               |

## Desarrollo

```bash
npm install
npm run dev
```

## Base de datos

Las migraciones están en `prisma/migrations` (PostgreSQL).

- **Base nueva:** `npx prisma migrate deploy`
- **Base que ya existe en producción** (creada antes con `db push`): marcar la migración inicial como aplicada, una sola vez:

```bash
npx prisma migrate resolve --applied 0_init
```

## Estructura

- `app/page.tsx` — inicio
- `app/prensa` — sala de prensa y notas (`/prensa/[id]`)
- `app/admin` — editor de notas (protegido con `ADMIN_PASSWORD`, con límite de intentos)
- `app/api/chat` — chat IAn (con límite de mensajes por IP)
- `lib/site.ts` — datos de contacto (WhatsApp, email, agenda) en un solo lugar
- `tailwind.config.mjs` — paleta de marca, tipografías y animaciones
