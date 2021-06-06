import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import styles from "./styles.module.scss";


export function Player() {

  const audioRef= useRef<HTMLAudioElement>(null)

  const { 
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    tooglePlay,
    setPlayingState
   } = useContext(PlayerContext)

  const episode = episodeList[currentEpisodeIndex]


  useEffect(() => {
    if(!audioRef.current) return

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause()
    }
  
  }, [isPlaying])

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando agora" />
        <strong>Tocando Agora </strong>
      </header>

      { episode ? (
        <div className={styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit='cover'/>
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (

        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={ !episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>

            {episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#04d401'}}
                railStyle={{ backgroundColor: '#9f75ff'}}
                handleStyle={{ borderColor: '#04d401', borderWidth: 4 }}

              />
            ) : (
              <div className={styles.emptySlider} />
            )}

          </div>
          <span>00:00</span>
        </div>


      { episode && (
        <audio 
          src={episode.url} 
          autoPlay ref={audioRef}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
        />
      )}

        <div className={styles.buttons}>

          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar Anterior"/>
          </button>

          <button 
            type="button" 
            className={styles.playButton}
            disabled={!episode} 
            onClick={tooglePlay}
          >
            <img src={ isPlaying ? "pause.svg" : "/play.svg"} alt="Tocar"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar Próxima"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir"/>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Player;
