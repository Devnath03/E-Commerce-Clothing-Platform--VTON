function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}
;('use client')

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '5' }}>
        {(toast) => {
          // Set colors based on toast type
          let bgColor = 'black';
          if (toast.type === 'success') bgColor = 'black/80';
          else if (toast.type === 'error') bgColor = 'red.500';
          else if (toast.type === 'warning') bgColor = 'yellow.500';
          else if (toast.type === 'info') bgColor = 'blue.500';
          else if (toast.type === 'promise') bgColor = 'green/80';
          

          return (
            <Toast.Root
              width={{ md: 'sm' }}
              backgroundColor={bgColor} // Set dynamic background color
              color="white" // Set text color to white
              borderRadius="md"
              padding="4"
              boxShadow="lg"
            >
              {toast.type === 'loading' ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Toast.Indicator />
              )}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && (
                  <Toast.Title fontWeight="bold" color="white">
                    {toast.title}
                  </Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description color="gray.300">
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger
                  color="teal.300"
                  _hover={{ color: 'teal.500' }}
                >
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}
              {toast?.meta?.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};