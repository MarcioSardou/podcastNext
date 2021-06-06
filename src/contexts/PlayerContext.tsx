import { createContext, useState, ReactNode } from "react";

type Episode = {
  title: "string";
  members: "string";
  thumbnail: "string";
  duration: Number;
  url: "string";
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
  isPlaying: boolean;
  tooglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list:Episode[], index:number) => void;
};

type PlayerContextProviderProps = {
  children : ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list:Episode[], index:number) {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        tooglePlay,
        setPlayingState,
        playList
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
