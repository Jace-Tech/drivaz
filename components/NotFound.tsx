import React from 'react'
import { Center, Text } from 'native-base'

interface NotFoundProps { }

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <Center h={"80%"}>
        <Text fontSize={"xl"} fontWeight={"semibold"} color={"coolGray.700"}>No Driver Found</Text>
        <Text fontSize={"sm"} fontFamily={"SpaceMono"} color={"coolGray.500"}>Try coping DIN from the details page</Text>
    </Center>
  )
}

export default NotFound