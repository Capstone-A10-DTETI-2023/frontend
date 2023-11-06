import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
} from '@chakra-ui/react'

const NotificationPrefTag = ({ variant = 'active' }: { variant: string }) => {
    return (
        <>
            <Tag
                size={'sm'}
                borderRadius='full'
                variant='solid'
                colorScheme={variant === 'active' ? 'green' : 'gray'}
            >
                <TagLabel>{variant === 'active' ? 'Active' : 'Deactive'}</TagLabel>
            </Tag>
        </>
    );
}

export default NotificationPrefTag;