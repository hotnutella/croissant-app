# Croissant App

Cross-platform app to rate and discover croissants around the world.

## Web

```bash
cd web
npm install
npm run dev
```

Create a `.env` file based on `.env.example` and set your Supabase credentials.

## Mobile

```bash
cd mobile
npm install
npm start
```

Both web and mobile use the same Supabase credentials from the `.env` file.

The project uses TailwindCSS, Supabase, React/Next.js and React Native with Expo. UI text is fully internationalized with `react-i18next` and comes with example translations for English, Russian, Ukrainian and French.
