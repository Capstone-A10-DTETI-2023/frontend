import { memo, ChangeEvent, useState } from 'react'
import {
    Select,
    Input,
    Icon,
    IconButton,
    Button,
    Divider
} from '@chakra-ui/react'

import { MdArrowRight, MdDownload, MdRefresh } from 'react-icons/md'
import date from '@/utils/date'

const SelectSensor = ({ children, onChange, value }: { children: JSX.Element | JSX.Element[], onChange: (e: ChangeEvent<HTMLSelectElement>) => void, value: number }) => {
    return (
        <>
            <div id="select-sensor-wrapper" className='w-fit'>
                <Select
                    variant={'filled'}
                    bgColor={'teal.400'}
                    _hover={{ bgColor: 'teal.500' }}
                    _focus={{ bgColor: 'teal.500' }}
                    color={'white'}
                    className='font-bold'
                    style={{ paddingTop: 0 }} // anxiety comes when you comment this
                    onChange={(e) => onChange(e)}
                    value={value}
                >
                    {children}
                </Select>
            </div>
        </>
    )
}


const SelectDateRange = ({ from, to, setFrom, setTo }: { from: string, to: string, setFrom: (val: string) => void, setTo: (val: string) => void }) => {

    return (
        <>
            <div id="select-date-range" className='w-fit flex gap-2 items-center'>
                <div id="select-date-range-wrapper" className='w-fit flex items-center'>
                    <Input
                        id='from-date'
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <Icon fontSize={36} as={MdArrowRight} />
                    <Input
                        id='to-date'
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

const SelectLimit = ({ children, onChange, value }: { children: JSX.Element | JSX.Element[], onChange: (e: ChangeEvent<HTMLSelectElement>) => void, value: number }) => {
    return (
        <>
            <div id="select-sensor-wrapper" className='w-fit'>
                <Select
                    variant={'outline'}
                    style={{ paddingTop: 0 }} // anxiety comes when you comment this
                    onChange={(e) => onChange(e)}
                    value={value}
                >
                    {children}
                </Select>
            </div>
        </>
    )
}

const Buttons = ({ reload }: { reload: () => void }) => {
    return (
        <>
            <div id="buttons-wrapper" className="space-x-2">
                <IconButton
                    aria-label='Download'
                    size='md'
                    variant={'outline'}
                    icon={<MdDownload />}
                />
                <IconButton
                    aria-label='Refresh'
                    size='md'
                    variant={'outline'}
                    icon={<MdRefresh />}
                    onClick={reload}
                />
            </div>
        </>
    )
}


export default {
    SelectSensor: memo(SelectSensor),
    SelectDateRange: memo(SelectDateRange),
    SelectLimit: memo(SelectLimit),
    Buttons: memo(Buttons),
}
