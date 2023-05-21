import React from 'react'
import { Box, HStack, ScrollView, Skeleton, VStack } from 'native-base'
import { DEFAULT_PAD } from '../constants/Global'

interface DriversSkeletonProps { }

const DriversSkeleton: React.FC<DriversSkeletonProps> = () => {
  const CARD_LENGTH = 10
  return (
    <ScrollView p={DEFAULT_PAD} bgColor={"white"}>
      <VStack space={3}>
        {new Array(CARD_LENGTH).fill("").map((_, index) => <DriversSkeletonCard key={index} />)}
      </VStack>
    </ScrollView>
  )
}


const DriversSkeletonCard = () => {
  return (
    <Box p={2} rounded={"md"} bgColor={"gray.100"} overflow={"hidden"}>
      <HStack space={3} alignItems={"center"}>
        <Skeleton startColor={'blue.200'} height={16} width={16} rounded={"full"} />
        <VStack space={2} flex={1}>
          <Skeleton.Text pt={0} lines={1} />
          <Skeleton.Text lines={1} w={24} pt={'2'} />
        </VStack>
      </HStack>
    </Box>

  )
}

export default DriversSkeleton