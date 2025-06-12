# Croissant App

Cross-platform app to rate and discover croissants around the world.

## Web

```bash
cd web
npm install
npm run dev
```

## Mobile

```bash
cd mobile
npm install
npm start
```

The mobile project is configured with [NativeWind](https://www.nativewind.dev/) to
use Tailwind classes in React Native components. Styles are generated from
`tailwind.config.js` and Babel is configured with the `nativewind/babel` plugin.

The project uses TailwindCSS, Supabase, React/Next.js and React Native with Expo. UI text is fully internationalized with `react-i18next` and comes with example translations for English, Russian, Ukrainian and French.
