import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTZlOTRkZmEzMGM5NmFhNDcyYzQ4M2FhY2ZlODJmMCIsIm5iZiI6MTcyMTMzNzkwMS41MjQwNzUsInN1YiI6IjY0ZWYyMDU1NGIwYzYzMDBjNDI2NGYxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ENwC0fooQeQkZTwpBGce3_cXyJGTcEhSobKH8jtkxfw",
      },
    }
  );

  return json(await url.json());
}

const MovieId = () => {
  const data: any = useLoaderData();
  console.log(data);
  return (
    <div className="min-h-screen px-10 py-10 max-w-screen-2xl mx-auto">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt=""
        className="h-[40vh] object-cover w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Homepage:</span>{" "}
            <Link to={data.homepage} target="_blank">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span>{" "}
            {data.original_language}
          </h1>

          <h1>
            <span className="underline">Overview:</span> {data.overview}
          </h1>

          <h1>
            <span className="underline">Release Date:</span> {data.release_date}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MovieId;
