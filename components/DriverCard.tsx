import React from 'react'
import { Avatar, Box, HStack, themeTools, Pressable, VStack, Text } from 'native-base'
import { getSubName } from '../utils/helpers'
import { useRouter } from 'expo-router'

interface DriverCardProps extends IDriver { }

const DriverCard: React.FC<DriverCardProps> = React.memo(({ name, image, driverIdentificationNumber: DIN, }) => {
  const randomColor = themeTools.randomColor({string: name})
  const { push } = useRouter()

  return (
    <Pressable onPress={() => push(`driver/${DIN}`)} >
      {({ isPressed }) => (
        <Box p={3} style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }} bgColor={'blue.50'} w={"full"} rounded={"md"}>
          <HStack space={3}>
            <Avatar source={{ uri: image }} bgColor={randomColor}>
              {getSubName(name)}
            </Avatar>
            <VStack>
              <Text fontWeight={"medium"} fontSize={"md"} color={"gray.700"}>{name}</Text>
              <Text color={"gray.500"}>ID: {DIN}</Text>
            </VStack>
          </HStack>
        </Box>
      )}
    </Pressable>
  )
})

export default DriverCard