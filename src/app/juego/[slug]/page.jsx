import GameClientContent from './GameClientContent';

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/details/${slug}`);
  const data = await res.json();
  const game = data.game;

  if (!game) return { title: "Juego no encontrado | RetroScore" };

  return {
    title: `${game.title} | RetroScore`,
    description: `Supera los récords en ${game.title}. Juega gratis, sube tu captura y reclama tu lugar en el podio de RetroScore.`,
    openGraph: {
      title: `🕹️ ¡A jugar ${game.title}!`,
      images: [
        {
          url: game.image,
          width: 1200,
          height: 630,
          alt: `Jugar ${game.title} en RetroScore`,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: game.title,
      description: '¿Podrás superar el récord actual?',
      images: [game.image],
    }
  };
}

// 2. EL COMPONENTE PADRE (SERVIDOR)
export default async function Page  ({ params }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/details/${slug}`, {
    cache: 'no-store'
  });
  const data = await res.json();
  return <GameClientContent initialGame={data.game} />;
}
