import React, { useState } from 'react'
import { Box, Fab, FlatList, Icon } from 'native-base'
import { DEFAULT_PAD } from '../constants/Global'
import { useDriversContext } from '../contexts/DriversContext'
import DriversSkeleton from '../components/DriversSkeleton'
import DriverCard from '../components/DriverCard'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

interface HomeScreenProps { }

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { drivers } = useDriversContext()
  const { push } = useRouter()

  if (!drivers.length) return (
    <DriversSkeleton />
  )

  return (
    <Box h={"full"} bgColor={"white"} padding={DEFAULT_PAD}>
      <FlatList
        h={"full"}
        data={drivers}
        ItemSeparatorComponent={() => <Box my={1.5} />}
        renderItem={({ item }) => <DriverCard {...item} />}
        keyExtractor={({ _id }) => _id}
      />
      <Fab
        colorScheme={"coolGray"}
        renderInPortal={false}
        onPress={() => push("add")}
        shadow={2} size="sm" icon={<Icon color="white" as={Ionicons} name="person-add-outline" size="lg" />}
      />
    </Box>
  )
}

export default HomeScreen