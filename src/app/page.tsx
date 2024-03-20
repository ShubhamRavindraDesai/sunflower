import Image from "next/image";

export default async function Home() {
  const newSongs = await fetch("https://itunes.apple.com/search?term=alan", {
    method: "POST",
  });
  const songs = await newSongs.json();
  console.log(songs);
  return (
    <>
      <header className="flex w-full">
        <a>SunFlower</a>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <section className="grid gap-4 w-full max-[375px]:grid-cols-1 ">
          {songs?.results.map((song) => {
            return (
              <article className="flex min-[768px]:flex-col">
                <figure className="aspect-square h-full">
                  <picture>
                    <source
                      srcSet={`${song.artworkUrl60} 300w, ${song?.artworkUrl100} 600w`}
                      sizes="(max-width: 600px) 480px, 600px"
                    />
                    <img
                      height={"100%"}
                      width={"100%"}
                      src={song.artworkUrl60}
                      alt={song?.trackName}
                      className="aspect-square img rounded-md object-contain"
                    ></img>
                  </picture>
                </figure>
                <h1 className="whitespac-nowrap text-ellipsis overflow-hidden text-nowrap truncate w-fit max-w-[200px]">
                  {song.trackCensoredName}
                </h1>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
