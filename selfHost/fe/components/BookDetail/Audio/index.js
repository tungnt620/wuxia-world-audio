import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import styles from './styles'

const Audio = (
  {
    currentChapter = {},
    onClickPrevious = () => {},
    onClickNext = () => {},
  }
) => {
  return (
    <section className={'columns audio-section'}>
      <div className={'column'}>
        <figure className={'audio-player'}>
          <AudioPlayer
            autoPlay={true}
            src={currentChapter.audio}
            showLoopControl={false}
            autoPlayAfterSrcChange={false}
            showSkipControls={false}
            showJumpControls={false}
            onClickPrevious={onClickPrevious}
            onClickNext={onClickNext}
          />
        </figure>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Audio
