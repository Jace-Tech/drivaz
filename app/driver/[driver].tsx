import { ImageBackground, Dimensions, Platform } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Avatar, Box, Button, Center, CheckIcon, FormControl, HStack, Icon, IconButton, Input, KeyboardAvoidingView, Pressable, ScrollView, Select, Spacer, Spinner, Text, VStack, useClipboard, useDisclose, useToast } from 'native-base'
import { DEFAULT_COLOR, DEFAULT_PAD } from '../../constants/Global'
import { useDriversContext } from '../../contexts/DriversContext'
import Feather from '@expo/vector-icons/Feather'
import AntDesign from '@expo/vector-icons/AntDesign'
import { except, formatDate, getSubName, logger, splitWords } from '../../utils/helpers'
import DeleteModal from '../../components/DeleteModal'
import ToastAlert from '../../components/ToastAlert'

interface DriverProps { }

const Driver: React.FC<DriverProps> = () => {
  const [driverData, setDriverData] = useState<IDriver | null>(null)
  const [toastId, setToastId] = useState<any>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<IDriver | null>(null)
  const [deleteData, setDeleteData] = useState<boolean>(false)
  const [DP, setDP] = useState<string | null>(null)
  const { driver } = useLocalSearchParams()
  const { drivers, handleUpdateDriver, handleDeleteDriver } = useDriversContext()
  const { onCopy, hasCopied } = useClipboard()
  const toast = useToast()
  const { replace, back } = useRouter()
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclose()


  // GET DRIVERS INFO
  const getDriverInfo = () => {
    // REDIRECT TO MAIN SCREEN IF THE DRIVERS LIST EMPTY OR DRIVER ID IS NULL / UNDEFINED
    if (!driver || !drivers?.length) {
      replace("/")
      return
    }

    // GET THE DRIVER DATA FROM THAT GLOBAL STATE
    const data = drivers?.find(_driver => _driver.driverIdentificationNumber === driver)
    if (!data) {
      replace("/")
      return
    }
    const IMAGE_SUBNAME = getSubName(data.name)
    setDP(IMAGE_SUBNAME)
    setDriverData(data)
    setEditingData(data)
  }

  const handleSetEdit = useCallback((key: string | null) => {
    setIsEditing(key)
  }, [setIsEditing, isEditing])


  // HANDLE INPUT TEXTS
  const handleChangeText = useCallback((text: string, key: string) => {
    const keyName = Object.keys(editingData!).find(name => name.includes(key.trim()))
    if (!keyName) return
    setEditingData(prevData => ({ ...prevData, [keyName]: text } as any))
  }, [editingData, setEditingData])

  // TODO: SET SEARCH SCREEN

  // DELETE DRIVER
  const handleDeleteDriverAction = async () => {
    const data = await handleDeleteDriver(driver as string)
    if (!data?.success) {
      setToastId(toast.show({
        render: ({ id }) => (
          <ToastAlert {...{
            id, isClosable: true,
            status: "error",
            variant: "subtle",
            title: data?.message,
            close: () => toast.close(id)
          }}
          />
        )
      }))
    }
    else {
      setToastId(toast.show({
        render: ({ id }) => (
          <ToastAlert {...{
            id, isClosable: true,
            variant: "subtle",
            status: "success",
            title: data?.message,
            close: () => toast.close(id)
          }}
          />
        )
      }))
    }

    replace("/")
    setDeleteData(false)
  }

  // UPDATE DRIVER
  const handleUpdateDriverAction = async () => {
    openLoading()
    const data = await handleUpdateDriver(editingData!)
    logger({ data })
    if (data && data?.success) {
      setToastId(toast.show({
        render: ({ id }) => <ToastAlert {...{ id, status: "success", isClosable: true, variant: "subtle", title: data?.message, close: () => toast.close(id) }} />
      }))
    }
    else {
      setToastId(toast.show({
        render: ({ id }) => <ToastAlert {...{
          id,
          status: "error", title: data?.message, close: () => toast.close(id)
        }} />
      }))
    }
    closeLoading()
    setIsEditing(null)
  }

  // HANDLE COPY
  const handlePress = () => {
    if (toastId && toast.isActive(toastId)) return
    onCopy(driverData?.driverIdentificationNumber!)
    hasCopied && setToastId(toast.show({
      title: "copied",
    }))
  }

  useEffect(() => {
    getDriverInfo()
  }, [drivers, driver])


  if (!driverData) return (
    <Box h={"full"} bg={"white"} safeArea>
      <Spinner size={"lg"} colorScheme={"coolGray"} />
    </Box>
  )

  const IMAGE_HEIGHT = Dimensions.get("screen").height / 3.5
  const detailsData = Object.entries({
    ...except(editingData, "driverIdentificationNumber", "_id", "image", "__v", "updatedAt", "createdAt", "licenseNumber"),
    "license Number": editingData?.licenseNumber!,
    "date registered": formatDate(editingData?.createdAt!),
  })


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Box h={"full"} safeAreaBottom>

        {/* BACKGROUND SECTION */}
        <ImageBackground
          source={require("../../assets/bg.jpeg")}
          alt={"background"}
          style={{ height: IMAGE_HEIGHT }}
        >
          <HStack safeArea px={DEFAULT_PAD} alignItems={"center"}>
            <Pressable onPress={back} android_ripple={{ radius: 50, borderless: true, color: "white" }}>
              <Icon as={AntDesign} size={"lg"} name={"arrowleft"} color="white" />
            </Pressable>

            <Spacer />

            <Pressable p={1} onPress={() => setDeleteData(true)} android_ripple={{ radius: 50, borderless: true, color: "white" }}>
              <Icon as={AntDesign} size={"lg"} name={"deleteuser"} color="red.500" />
            </Pressable>
          </HStack>
        </ImageBackground>
        {/* END BACKGROUND SECTION */}

        {/* AVATAR SECTION */}
        <Box px={DEFAULT_PAD} mt={-16} pb={5}>
          <HStack alignItems={"center"} space={3} >
            <Avatar size={"2xl"} source={{ uri: driverData?.image }} bgColor={DEFAULT_COLOR} borderColor={"white"} borderWidth={4}>
              {DP ?? "DP"}
            </Avatar>

            <HStack alignItems={"center"} alignSelf={"flex-end"} mb={3} flex={1} p={2}>
              <Text fontWeight={"medium"} flex={1} fontSize={"md"} color={"coolGray.500"}>DIN: <Text fontFamily={"SpaceMono"} color={"coolGray.600"}>{driverData.driverIdentificationNumber}</Text></Text>
              <Pressable
                onPress={handlePress}
                android_ripple={{ radius: 20, borderless: true }} p={2}
              >
                <Icon as={Feather} size={"md"} name={"copy"} color="coolGray.500" />
              </Pressable>
            </HStack>
          </HStack>
        </Box>
        {/* END AVATAR SECTION */}

        {/* DETAILS SECTION */}
        <ScrollView px={DEFAULT_PAD} h={"auto"} pb={8}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {/* DETAILS SECTION */}
            <Box>
              <VStack space={4}>
                {detailsData.map(([key, value]) => (
                  <DetailCard
                    getDriverInfo={getDriverInfo}
                    handleChangeText={handleChangeText}
                    handleSetEdit={handleSetEdit}
                    isChanging={key === isEditing}
                    nonEditable={key.includes("date")}
                    {...{ key, title: key, value: value as string }}
                  />
                ))}
              </VStack>
            </Box>
            {/* END DETAILS SECTION */}

            {/* SAVE BUTTON SECTION */}
            {isEditing && (
              <Box mt={5}>
                <Button onPress={handleUpdateDriverAction} isLoading={isLoading} isLoadingText='Saving' spinnerPlacement="end" colorScheme={"coolGray"} size={"lg"} w={"full"}>Save</Button>
              </Box>
            )}
            {/* END SAVE BUTTON SECTION */}
          </KeyboardAvoidingView>
        </ScrollView>
        {/* END DETAILS SECTION */}

        {/* MODAL SECTION */}
        <DeleteModal
          handleAction={() => handleDeleteDriverAction()}
          isOpen={deleteData}
          onClose={() => setDeleteData(false)}
          driver={driverData}
        />
        {/* END MODAL */}
      </Box>
    </>
  )
}

interface DetailCardProp {
  title: string;
  value: string;
  nonEditable?: boolean;
  isChanging: boolean;
  handleSetEdit: (key: string | null) => void;
  getDriverInfo: () => void;
  handleChangeText: (value: string, key: string) => void;
}

const DetailCard: React.FC<DetailCardProp> = memo(({ title, value, isChanging, handleSetEdit, handleChangeText, getDriverInfo, nonEditable }) => {

  const handleCancel = () => {
    handleSetEdit(null)
    getDriverInfo()
  }

  return (
    <>
      {isChanging ? (

        <>
          {title === "gender" ? (
            <HStack w={"full"} alignItems={"stretch"}>
              <VStack flex={1}>
                <Text color={"coolGray.800"} fontSize={"xs"} letterSpacing={1} textTransform={"uppercase"} fontWeight={"bold"}>{title}: </Text>
                <HStack>
                  <Select flex={1} mt={2} selectedValue={value} minWidth="200" accessibilityLabel="Select Gender" placeholder="Select Gender" _selectedItem={{
                    bg: "coolGray.200",
                    endIcon: <CheckIcon size="5" />
                  }} onValueChange={itemValue => handleChangeText(itemValue, splitWords(title))}>
                    <Select.Item label="" value="" disabled />
                    <Select.Item label="Male" value="male" />
                    <Select.Item label="Female" value="female" />
                  </Select>

                  <Center>
                    <IconButton onPress={handleCancel} variant={"ghost"} rounded={"full"} mr={1} _icon={{ as: AntDesign, name: "close" }} />
                  </Center>
                </HStack>
              </VStack>
            </HStack>
          ) : (
            <HStack>
              <VStack flex={1}>
                <Text color={"coolGray.800"} fontSize={"xs"} letterSpacing={1} textTransform={"uppercase"} fontWeight={"bold"}>{title}: </Text>
                <FormControl isRequired mt={2}>
                  <Input
                    value={value}
                    fontSize={"md"}
                    onChangeText={(text) => handleChangeText(text, splitWords(title))}
                    color={"coolGray.700"}
                    InputRightElement={(
                      <IconButton onPress={handleCancel} variant={"ghost"} rounded={"full"} mr={1} _icon={{ as: AntDesign, name: "close" }} />
                    )}
                  />
                </FormControl>
              </VStack>
            </HStack>
          )}

        </>
      ) : (
        <HStack alignItems={"center"}>
          <VStack flex={1}>
            <Text color={"coolGray.800"} fontSize={"xs"} letterSpacing={1} textTransform={"uppercase"} fontWeight={"bold"}>{title}: </Text>
            <Text color={"coolGray.600"} fontSize={"md"} fontFamily={"SpaceMono"} textTransform={"capitalize"}>{value}</Text>
          </VStack>
          {!nonEditable && (
            <Pressable hitSlop={5} onPress={() => handleSetEdit(title)}>
              <Icon as={AntDesign} size={"sm"} name={"edit"} color="coolGray.500" />
            </Pressable>
          )}
        </HStack>
      )}
    </>
  )
})


export default Driver