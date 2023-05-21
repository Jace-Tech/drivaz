import React from 'react'
import { Box, HStack, Text, Spacer, Pressable, Icon } from 'native-base'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { DEFAULT_COLOR, DEFAULT_PAD } from '../constants/Global'

interface HeaderProps extends NativeStackHeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Box p={DEFAULT_PAD} safeAreaTop bgColor={DEFAULT_COLOR}>
      <HStack alignItems={"center"}>
        <Text fontWeight={500} color={"white"} fontSize={"2xl"}>Drivaz</Text>
        <Spacer />
        <HStack alignItems={"center"} space={3}>
          <HeaderButtonLink link="/add" icon="person-add-outline" />
          <HeaderButtonLink link="/search" icon="search-outline" />
        </HStack>
      </HStack>
    </Box>
  )
}


interface HeaderButtonLinkProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  link: string;
}

const HeaderButtonLink: React.FC<HeaderButtonLinkProps> = ({ icon, link }) => {
  return (
    <Link href={link} asChild>
      <Pressable p={1} android_ripple={{ borderless: true, radius: 24, color: "white" }}>
        <Icon as={Ionicons} name={icon} size={"lg"} color={"white"} />
      </Pressable>
    </Link>
  )
}

export default Header