import Changelog from "./components/Changelog";
import { useChangelogStore } from "@/store/ChangelogStore";
import { useEffect } from "react";

const Home = () => {
  const { changelog, fetchChangelog } = useChangelogStore()

  useEffect(() => {
    fetchChangelog()
  }, [fetchChangelog])

  return (
    <div className="relative min-h-full">
      <div className="absolute inset-0 bg-black/50 -z-10" />
      <div className="flex flex-col items-center px-4 mt-5 z-10 gap-4">
        <div className="max-w-5xl w-full bg-zinc-700 rounded-2xl shadow-xl p-8">
          <div className="mb-6 flex justify-center">
            <img
              src="/wuwaplanner.png"
              alt="wuwaplanner"
              className="max-h-48"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Easier Wuthering Waves Farming
          </h1>
          <p className="text-zinc-300 leading-relaxed text-center">
            Welcome to Wuwa Planner. With it, you can better organize your
            farming. Define goals for characters and weapons. Display your
            inventory and find our where and how much to farm materials.
          </p>
        </div>
        <Changelog entries={changelog} />
      </div>
    </div>
  );
};

export default Home;
