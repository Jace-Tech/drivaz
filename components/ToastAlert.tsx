import React from 'react'
import { Alert, CloseIcon, HStack, IAlertProps, IconButton, Text, VStack } from 'native-base';

interface ToastAlertProps extends IAlertProps {
  id?: string;
  status?: string;
  title?: string;
  close: () => void;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ id, status, title, close, ...rest }) => {
  return (
    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={"subtle"} {...rest}>
      <VStack space={1} flexShrink={1} w="90%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1}>
              {title ?? ""}
            </Text>
          </HStack>
          <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{ color: "darkText" }} onPress={close} />
        </HStack>
      </VStack>
    </Alert>
  )
}

export default ToastAlert