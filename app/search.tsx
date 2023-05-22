import React, { useState } from 'react'
import { Box, Button, Fab, FlatList, FormControl, HStack, Icon, Input, useDisclose } from 'native-base'
import { DEFAULT_PAD } from '../constants/Global'
import DriverCard from '../components/DriverCard'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { fetchOneDriver } from '../apis/drivers.api'
import NotFound from '../components/NotFound'

interface HomSearchScreenProps { }

const HomSearchScreen: React.FC<HomSearchScreenProps> = (prop) => {
  const [id, setId] = useState<string>("")
  const [driver, setDriver] = useState<IDriver[]>([])
  const { isOpen, onOpen, onClose } = useDisclose()
  const { push } = useRouter()

  // SEACRH DRIVER
  const handleSearchDriver = async () => {
    onOpen()
    const result = await fetchOneDriver(id)
    if (!result?.success) return result
    setDriver([result.data as IDriver])
    setId("")
    onClose()
  }

  return (
    <Box h={"full"} bgColor={"white"} padding={DEFAULT_PAD}>
      <HStack pb={3} space={2}>
        <FormControl flex={1}>
          <Input value={id} onChangeText={text => setId(text)} placeholder={"Search by DIN"} />
        </FormControl>
        <Button disabled={!(Boolean(id))} isLoading={isOpen} isLoadingText='Searching' onPress={handleSearchDriver} colorScheme={"coolGray"} px={4}>Search</Button>
      </HStack>

      {!driver.length ? (
        <NotFound />
      ) : (
        <FlatList
          h={"full"}
          data={driver}
          ItemSeparatorComponent={() => <Box my={1.5} />}
          renderItem={({ item }) => <DriverCard {...item} />}
          keyExtractor={({ _id }) => _id}
        />
      )}
      <Fab
        colorScheme={"coolGray"}
        renderInPortal={false}
        onPress={() => push("add")}
        shadow={2} size="sm" icon={<Icon color="white" as={Ionicons} name="person-add-outline" size="lg" />}
      />
    </Box>
  )
}

export default HomSearchScreen