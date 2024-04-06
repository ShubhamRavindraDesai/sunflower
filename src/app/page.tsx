import { heartIcon, logoIconDark, playIcon, userIcon } from "./assets/icons";
import { Controls } from "./components/Controls";

export interface Song {
  artworkUrl60?: string;
  artworkUrl100?: string;
  trackName?: string;
  trackCensoredName?: string;
}

export default async function Home() {
  const newSongs = await fetch(
    "https://itunes.apple.com/search?term=alan walker",
    {
      method: "POST",
    }
  );
  const songs = await newSongs.json();
  console.log(songs.results[0]);
  return (
    <>
      <header className="fixed z-50 h-16 top-0 flex w-full p-2 justify-between bg-slate-800">
        <a href="/" aria-label="Go Home" className="flex gap-2">
          <figure>{logoIconDark}</figure>
        </a>
        <nav>
          <button>
            <figure>{userIcon}</figure>
          </button>
        </nav>
      </header>
      <main className="relative mt-14 mb-14 flex  flex-col items-center justify-between p-4">
        <section className="grid gap-4 w-full max-[425px]:grid-cols-1 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] ">
          {songs?.results.map((song: Song, index: number) => {
            return (
              <article
                key={`${song.trackName}-${index}`}
                className="flex min-[425px]:flex-col justify-start gap-2 items-start contents-starts-start-start"
              >
                <figure className="aspect-square h-auto w-full max-[425px]:h-12  max-[425px]:w-12 ">
                  <picture>
                    <source
                      srcSet={`${song?.artworkUrl60?.replace(
                        "60x60bb",
                        "200x200bb"
                      )} 300w, ${song?.artworkUrl100?.replace(
                        "100x100bb",
                        "200x200bb"
                      )} 600w`}
                      sizes="(max-width: 600px) 480px, 600px"
                    />
                    <img
                      height={"100%"}
                      width={"100%"}
                      src={song?.artworkUrl60?.replace("60x60bb", "200x200bb")}
                      alt={song?.trackName}
                      className="aspect-square img rounded-md object-cover"
                    ></img>
                  </picture>
                </figure>
                <h1 className="whitespace-nowrap text-ellipsis overflow-hidden text-nowrap truncate w-fit max-w-[150px]">
                  {song?.trackCensoredName}
                </h1>

                <section className="flex gap-2 justify-center items-center max-[425px]:ms-auto">
                  <figure className="relative">{playIcon}</figure>
                  <figure className="relative">{heartIcon}</figure>
                </section>
              </article>
            );
          })}
        </section>
      </main>
      <footer className="fixed z-50 bottom-0 flex w-full p-2 justify-between  bg-slate-400">
        <article
          key={`${songs.results[0].trackName}-index`}
          className="flex  justify-center gap-4 items-center contents-starts-start-start"
        >
          <figure className="aspect-square h-12  w12 ">
            <picture>
              <source
                srcSet={`${songs.results[0]?.artworkUrl60} 300w, ${songs.results[0]?.artworkUrl100} 600w`}
                sizes="(max-width: 600px) 480px, 600px"
              />
              <img
                height={"100%"}
                width={"100%"}
                src={songs.results[0]?.artworkUrl60}
                alt={songs.results[0]?.trackName}
                className="aspect-square img rounded-md object-cover"
              ></img>
            </picture>
          </figure>
          <h1 className=" whitespac-nowrap text-ellipsis overflow-hidden text-nowrap truncate w-fit max-w-[200px]">
            {songs.results[0]?.trackCensoredName}
          </h1>
          <Controls />
        </article>
      </footer>
    </>
  );
}
