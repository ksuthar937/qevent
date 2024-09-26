import ArtistCard from "@/components/ArtistCard";

export default async function Artists() {
  const response = await fetch("https://qevent-backend.labs.crio.do/artists");
  const artists = await response.json();

  return (
    <div className="flex flex-wrap p-8 gap-4 justify-center">
      {artists.map((artist) => (
        <ArtistCard artistData={artist} key={artist.id} />
      ))}
    </div>
  );
}
