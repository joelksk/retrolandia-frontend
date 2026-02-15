
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const sitemap = async () => {
  let games = [];
  try {
    const response = await fetch(`${API_URL}/api/games/sitemap-data`, { cache: 'no-store' });
    games = await response.json();
  } catch (error) {
    console.error("Error cargando juegos para el sitemap:", error);
  }

  //RUTAS ESTATICAS
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
    url: `${BASE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/privacity`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.3,
  },

  ];

  //MAPEAMOS LOS JUEGOS
  const gameRoutes = games.map((game) => ({
    url: `${BASE_URL}/juego/${game.slug}`,
    lastModified: new Date(game.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...gameRoutes];
}

export default sitemap