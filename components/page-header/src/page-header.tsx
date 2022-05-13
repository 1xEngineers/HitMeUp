import { Text } from '@hmu-component/text'
import { useNavigation } from '@react-navigation/native'
import { ChevronBackIcon, CloseIcon } from 'native-x-icon'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { HeaderButton } from './header-button'

export interface PageHeaderProps {
  children?: string | React.ReactElement
  leftButton?: string | React.ReactElement
  leftButtonDisabled?: boolean
  onTapLeftButton?: () => void
  rightButton?: string | React.ReactElement
  rightButtonDisabled?: boolean
  rightButtonLoading?: boolean
  onTapRightButton?: () => void
  showBackButton?: boolean
  showCloseButton?: boolean
}

export function PageHeader({
  leftButton,
  rightButton,
  leftButtonDisabled,
  rightButtonDisabled,
  rightButtonLoading,
  onTapLeftButton,
  onTapRightButton,
  showBackButton,
  showCloseButton,
  children,
}: PageHeaderProps) {
  const { goBack } = useNavigation<any>()
  return (
    <Stack>
      <Stack horizontal alignCenter alignMiddle padding='normal'>
        <Stack width={80}>
          {showBackButton ? (
            <HeaderButton onTap={onTapLeftButton ?? goBack}>
              <ChevronBackIcon color={COLOR.TERTIARY} />
            </HeaderButton>
          ) : (
            <HeaderButton disabled={leftButtonDisabled} onTap={onTapLeftButton ?? goBack}>
              {leftButton}
            </HeaderButton>
          )}
        </Stack>
        <Stack fill overflowVisible>
          {typeof children === 'string' ? (
            <Text bold alignCenter textColor={COLOR.SECONDARY}>
              {children}
            </Text>
          ) : (
            children
          )}
        </Stack>
        <Stack width={80} alignRight>
          {showCloseButton ? (
            <HeaderButton onTap={onTapRightButton}>
              <CloseIcon color={COLOR.TERTIARY} />
            </HeaderButton>
          ) : (
            <HeaderButton
              disabled={rightButtonDisabled}
              loading={rightButtonLoading}
              onTap={onTapRightButton}
            >
              {rightButton}
            </HeaderButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
