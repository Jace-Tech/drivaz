import { View, Text } from 'react-native'
import React from 'react'
import { IBoxProps, Stagger } from 'native-base'
import { IStaggerStyleProps } from 'native-base/lib/typescript/components/composites/Transitions/Stagger'

interface AnimatedBoxProps { 
  children: JSX.Element
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({ children }) => {
  return (
    <Stagger 
      initial={{
        opacity: 0,
        scale: 0,
        translateY: 34
      }} animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          mass: 0.8,
          stagger: {
            offset: 30,
            reverse: true
          }
        }
      }} exit={{
        translateY: 34,
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 100,
          stagger: {
            offset: 30,
            reverse: true
          }
        }
      }}
    > { children } </Stagger>
  )
}

export default AnimatedBox