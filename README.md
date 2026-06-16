# ChargePass Prototype

React + Vite + Tailwind CSS prototype for ChargePass, an EV charging payment and fleet management platform for Indonesia.

## Google Maps Embed API

The Driver App map preview uses Google Maps Embed API through an iframe only. It does not use the Google Maps JavaScript API, Places API, Directions API, real-time routing, or geolocation.

To enable the real embedded map preview, add this environment variable in `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_embed_api_key_here
```

If the key is missing, the app automatically shows the styled mock map fallback.
