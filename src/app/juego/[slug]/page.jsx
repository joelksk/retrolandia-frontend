import GameClientContent from './GameClientContent';

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games/details/${slug}`);
  const data = await res.json();
  const game = data.game;

  if (!game) return { title: "Juego no encontrado | RetroScore" };

  return {
    title: `${game.title} - Jugar Online | RetroScore`,
    description: game.description || `Juega a ${game.title} en RetroScore.`,
    openGraph: {
      title: `🕹️ ¡A jugar ${game.title}!`,
      images: [game.image],
      type: 'website',
    },
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
