import React from 'react'
import { Alert, CloseIcon, HStack, IAlertProps, IconButton, Text, VStack, useTheme } from 'native-base';

interface ToastAlertProps extends IAlertProps {
  id?: string;
  status?: string;
  variant?: string;
  title?: string;
  description?: string;
  isClosable: boolean;
  close: () => void;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ id, status, variant, title, description, close, isClosable, ...rest }) => {
  return (
    <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant} {...rest}>
      <VStack space={1} flexShrink={1} w="90%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title ?? ""}
            </Text>
          </HStack>
          {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
            color: variant === "solid" ? "lightText" : "darkText"
          }} onPress={close} /> : null}
        </HStack>
        <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
          {description ?? ""}
        </Text>
      </VStack>
    </Alert>
  )
}

export default ToastAlert