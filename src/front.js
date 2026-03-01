import React, { useState, useRef } from 'react'
import { CiLock } from "react-icons/ci";
import main_photo from "./assets/main_photo.jpg"
import Description from './components/description';
import { GiSoundOn } from "react-icons/gi";
import { GiSoundOff } from "react-icons/gi";

export default function Front() {
     const [isUnlocked, setIsUnlocked] = useState(false)
      const [showInvitation, setShowInvitation] = useState(false)
      const [hideText, setHideText] = useState(false)
      const [animating, setAnimating] = useState(false)
      const [showNames, setShowNames] = useState(false)
      const [isPlaying, setIsPlaying] = useState(false)
      const imageRef = useRef(null)
      const lockRef = useRef(null)
      const audioRef = useRef(null)

      // Функция вычисления нужного масштаба
      const computeScale = () => {
        const imageElement = imageRef.current
        if (!imageElement) return 1
        
        // Получаем исходный размер изображения
        const rect = imageElement.getBoundingClientRect()
        const originalSize = Math.max(rect.width, rect.height)
        
        // Получаем размер экрана
        const screenSize = Math.max(window.innerWidth, window.innerHeight)
        
        // Вычисляем масштаб с запасом 1.3 чтобы покрыть экран
        return (screenSize * 1.5) / originalSize
      }
    
      const open_lock = () => {
        if (animating) return 
        setAnimating(true)
        setHideText(true)
        
        const scale = computeScale()
        if (imageRef.current) {
          imageRef.current.style.setProperty('--scale', scale)
        }
        
        setTimeout(() => {
          if (imageRef.current) {
            imageRef.current.classList.add('animating')
          }
        }, 10) 

        if (audioRef.current) {
          audioRef.current.currentTime = 48;
          audioRef.current.volume = 0.5 
          audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
        })
          .catch(error => {
              console.log('Ошибка воспроизведения:', error)
          })
      }
        
        setTimeout(() => {
          setShowInvitation(true)
          setIsUnlocked(true)
          setAnimating(false)
          setShowNames(true)
        }, 2000) 
        
        setTimeout(() => {
          if (lockRef.current) {
            lockRef.current.style.opacity = '0'
            lockRef.current.style.transform = 'scale(0)'
          }
          document.querySelector('.front').style.display='block'
        }, 600)
    
      }
    
     const toggleMusic = () => {
        if (audioRef.current) {
          if (isPlaying){
            audioRef.current.pause()
          }else{
            audioRef.current.play()
          }
          setIsPlaying(!isPlaying)
        }
    }
      return (
        <div className="app-container">
           <audio ref={audioRef} loop preload="auto"><source src="/Anna_Of_The_North_-_Lovers_63547687.mp3" type="audio/mpeg" /></audio>
          <div className='front'>
            <div 
              ref={imageRef}
              className={`div-image ${isUnlocked ? 'expanded' : ''}`}
            >
              <img className='background-image' src={main_photo} alt="Background" /> 
              <div className="image-overlay overlay-gradient"></div>

              <div className={`names-overlay ${showNames ? 'visible' : ''}`}>
                <div className="names-container">
                  <h1 className="name bride">EKATERINA</h1>
                  <div className="ampersand">&</div>
                  <h1 className="name groom">ARTEM</h1>
                </div>
                <div className="date-line">11.07.2026</div>
              </div>

            </div>
            
            <div 
              ref={lockRef}
              className='lock' 
              onClick={open_lock} 
              style={{
                transition: 'all 0.5s ease', 
                opacity: isUnlocked ? 0 : 1,
                transform: isUnlocked ? 'scale(0)' : 'scale(1)',
                pointerEvents: animating ? 'none' : 'auto'
              }}
            >
              <CiLock style={{fontSize: '40px', color: '#FFF3D7'}}/>
              <div className='circle'/>
            </div>
          
            {!hideText && (
              <>
                <h3 className='unlock_string'>Разблокировать</h3>
                <h3 className='unlock_string'>приглашение</h3>
              </>
            )}
          </div>
          {isUnlocked && (
        <button 
          className="music-toggle"
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            color: '#FFF3D7',
            border: 'none',
            fontSize: '50px',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isPlaying ? <GiSoundOn />  : <GiSoundOff />}
        </button>
      )}
          {showInvitation && (
            <div className="invitation-section">
                <Description />
              
            </div>
          )}
        </div>
      )
}