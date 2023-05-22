import { BackHandler, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AspectRatio, Pressable, Box, Button, CheckIcon, Circle, FormControl, Icon, Image, Input, KeyboardAvoidingView, ScrollView, Select, VStack, useToast, useDisclose, isEmptyObj } from 'native-base'
import { DEFAULT_PAD } from '../constants/Global'
import { AntDesign } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { json, logger } from '../utils/helpers'
import ToastAlert from '../components/ToastAlert'
import { useDriversContext } from '../contexts/DriversContext'
import ExitModal from '../components/ExitModal'
import { useRouter } from 'expo-router'

interface AddScreenProps { }

const AddScreen: React.FC<AddScreenProps> = () => {
  const [userData, setUserData] = useState<IDriver | {}>({})
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset[] | null>(null)
  const { isOpen, onOpen, onClose } = useDisclose()
  const {isOpen: warn, onOpen: openWarning, onClose: closeWarning} = useDisclose()
  const [checker, setChecker] = useState<boolean>(false)
  const { handleCreateDriver } = useDriversContext()
  const toast = useToast()
  const { back } = useRouter()
  const isReady = Boolean(userData)


  // SAVE DATA
  const handleCreateDriverAction = async () => {
    onOpen()
    const result = await handleCreateDriver({ ...userData, image: photo ? `data:image/jpeg;base64,` + photo?.[0].base64 : null } as IDriver)
    if (!result.success) {
      toast.show({
        render: ({ id }) => (
          <ToastAlert
            title={result.message}
            id={id}
            status='error'
            close={() => toast.close(id)}
          />
        )
      })
      onClose()
      return
    }

    toast.show({
      render: ({ id }) => (
        <ToastAlert
          title={result.message}
          id={id}
          status='success'
          close={() => toast.close(id)}
        />
      )
    })

    setUserData({})
    setPhoto(null)
    onClose()
  }

  // GET IMAGE
  const handleGetImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ base64: true, allowsEditing: true, quality: 1 });
      if (result.canceled) {
        toast.show({
          render: ({ id }) => (
            <ToastAlert
              title={"No picture selected!"}
              id={id}
              status='info'
              close={() => toast.close(id)}
            />
          )
        })
        return
      }
      setPhoto(result.assets)
    }
    catch (e: any) {
      toast.show({
        render: ({ id }) => (
          <ToastAlert
            title={e.message}
            id={id}
            status='error'
            close={() => toast.close(id)}
          />
        )
      })
    }
  }

  useEffect(() => {
    logger(json({checker}))
  }, [checker])

  const handleChangeText = (value: string, key: string) => {
    setUserData(prev => ({...prev, [key]: value} as IDriver))
    if(!isEmptyObj(userData)) setChecker(true)
  }

  const handleBackPress = () => {
    openWarning()
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [])

  return (
    <>
      <ExitModal
        handleAction={back}
        isOpen={warn}
        onClose={() => closeWarning()}
      />
      <ScrollView px={DEFAULT_PAD} bg={"white"}>
        <KeyboardAvoidingView py={DEFAULT_PAD} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <VStack space={4}>

            <Box>
              <Pressable onPress={handleGetImage}>
                {({ isPressed }) => (
                  <>
                    {photo ? (
                      <AspectRatio w={120} h={120} ratio={1 / 1} rounded={"full"} overflow={"hidden"}>
                        <Image source={{ uri: photo[0].uri }} resizeMode='cover' alt={"image"} />
                      </AspectRatio>
                    ) : (
                      <Circle
                        style={{
                          transform: [
                            { scale: isPressed ? 0.96 : 1 }
                          ]
                        }}
                        w={120} h={120}
                        rounded={"full"} bgColor={"coolGray.300"}
                      >
                        <Icon as={AntDesign} name="camera" size={"3xl"} color={"coolGray.200"} />
                      </Circle>
                    )}
                  </>
                )}
              </Pressable>
            </Box>

            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <Input type='text' value={(userData as IDriver)?.name} onChangeText={data => handleChangeText(data, "name")} keyboardType='default' placeholder='eg. Jace Alexander' />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Driver's License</FormControl.Label>
              <Input type='text' value={(userData as IDriver)?.licenseNumber} onChangeText={data => handleChangeText(data, "licenseNumber")} keyboardType='default' placeholder='eg. 1234567890' />
            </FormControl>

            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input type='text' value={(userData as IDriver)?.phone} onChangeText={data => handleChangeText(data, "phone")} keyboardType='phone-pad' placeholder='eg. +23423456789' />
            </FormControl>

            <FormControl>
              <FormControl.Label>Address</FormControl.Label>
              <Input type='text' value={(userData as IDriver)?.address} onChangeText={data => handleChangeText(data, "address")} keyboardType='default' multiline placeholder='eg. No. 01 street name' />
            </FormControl>

            <Box>
              <FormControl.Label>Gender</FormControl.Label>
              <Select selectedValue={(userData as any)?.gender!} minWidth="200" accessibilityLabel="Select Gender" placeholder="Select Gender" _selectedItem={{
                bg: "coolGray.200",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => handleChangeText(itemValue, "gender")}>
                <Select.Item label="" value="" disabled />
                <Select.Item label="Male" value="male" />
                <Select.Item label="Female" value="female" />
              </Select>
            </Box>

            <Button disabled={!isReady || isOpen} onPress={handleCreateDriverAction} isLoading={isOpen} isLoadingText='Creating' mt={8} mb={5} size={"lg"} colorScheme={"coolGray"}>Add Driver</Button>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

export default AddScreen