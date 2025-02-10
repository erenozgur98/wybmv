import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

const App: React.FC = () => {
  const [isEnvelopeVisible, setEnvelopeVisible] = useState(true)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noClickCount, setNoClickCount] = useState(0)
  const [disableNoBtn, setDisableNoBtn] = useState(false)

  // Generate random position for the "No" button
  const getRandomPosition = () => {
    const x = Math.random() * 300 - 150 // Random X position between -150 and 150
    const y = Math.random() * 300 - 150 // Random Y position between -150 and 150
    return { x, y }
  }

  const handleYesClick = () => {
    alert("You have a beautiful heart! Happy Valentine's Day! ❤️")
    setDisableNoBtn(true)
  }

  const handleNoClick = () => {
    setNoButtonPosition(getRandomPosition())
    setNoClickCount((prev) => prev + 1)
  }

  const handleEnvelopeClick = () => {
    setEnvelopeVisible(false)
  }

  return (
    <div className='app'>
      {isEnvelopeVisible ? (
        <motion.div
          key={isEnvelopeVisible ? 'visible' : 'hidden'} // Add a key to trigger re-render
          className='envelope'
          initial={{ opacity: 1 }}
          animate={{ opacity: isEnvelopeVisible ? 1 : 0 }}
          transition={{
            duration: 5, // Slower fade duration
            ease: 'easeInOut', // Smooth easing
          }}
          onClick={handleEnvelopeClick}
        >
          <motion.div className='envelope-front'>
            <p className='for-label'>For Bri 💌</p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className='heart-container'
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className='heart'
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          >
            ❤️
          </motion.div>
          <h1 className='question'>Will you be my Valentine? 💘</h1>

          <motion.button
            className='ask-button yes-button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleYesClick}
            animate={{ scale: 1 + noClickCount * 0.5 }} // Yes button grows when No is clicked
          >
            Yes! 💌
          </motion.button>

          <motion.button
            className='ask-button no-button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={disableNoBtn ? null : handleNoClick}
            initial={{ opacity: 1 }}
            animate={{
              opacity: 1,
              x: noButtonPosition.x,
              y: noButtonPosition.y,
            }}
            transition={{ duration: 0.5 }}
            style={{
              cursor: disableNoBtn ? 'not-allowed' : 'pointer', // Change cursor to indicate it's disabled
              opacity: disableNoBtn ? 0.5 : 1, // Make it look grayed out when disabled
            }}
          >
            No, thanks! ❌
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default App
