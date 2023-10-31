import Link from "next/link";
import {
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Button,
    IconButton
} from "@chakra-ui/react";
import {
    MdSearch,
    MdAccountCircle,
    MdNotifications
} from 'react-icons/md'

const Navbar = () => {
    return (
        <>
            <div className="w-full fixed z-[99999999999] top-0 left-0 right-0 bg-white p-4 shadow">
                <ul className="w-full container mx-auto flex flex-row font-semibold text-base justify-between items-center">
                    <li className="text-lg font-extrabold" >
                        <Link href={'/'}>A10</Link>
                    </li>
                    <li className="flex items-center space-x-5">
                        <Link className="text-gray-800" href={'/dashboard'}>Dashboard</Link>
                        <Link className="text-gray-800" href={'/map'}>Map</Link>
                        <Link className="text-gray-800" href={'/profile'}>Profile</Link>
                        <InputGroup>
                            <Input placeholder='Search your node here..' />
                            <InputRightElement>
                                <Icon as={MdSearch} />
                            </InputRightElement>
                        </InputGroup>

                        <Button width={'fit-content'} paddingX={12} colorScheme='blue'>Search</Button>

                        <div className="notification-wrapper">
                            <div className="relative cursor-pointer">
                                <div className="absolute top-0 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full outline outline-2 outline-white">
                                    <p className="text-white text-sm">{3}</p>
                                </div>
                                <IconButton
                                    className="relative -z-10"
                                    isRound={true}
                                    variant={'ghost'}
                                    colorScheme='blue'
                                    aria-label='Account'
                                    fontSize={32}
                                    icon={<MdNotifications />}
                                />
                            </div>
                        </div>

                        <div className="profile-wrapper">
                            <IconButton
                                isRound={true}
                                variant={'ghost'}
                                colorScheme='blue'
                                aria-label='Account'
                                fontSize={36}
                                icon={<MdAccountCircle />}
                            />
                        </div>
                    </li>

                    {/* <li>
                        <InputGroup>
                            <Input placeholder='Search your node here..' />
                            <InputRightElement>
                                <Icon as={MdSearch} />
                            </InputRightElement>
                        </InputGroup>
                    </li>
                    <li>
                        <Button colorScheme='blue'>Search</Button>
                    </li>
                    <li>
                        <div className="wrapper relative cursor-pointer">
                            <div className="absolute top-0 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full outline outline-2 outline-white">
                                <p className="text-white text-sm">{3}</p>
                            </div>
                            <IconButton
                                className="relative -z-10"
                                isRound={true}
                                variant={'ghost'}
                                colorScheme='blue'
                                aria-label='Account'
                                fontSize={32}
                                icon={<MdNotifications />}
                            />
                        </div>
                    </li>
                    <li>
                        <IconButton
                            isRound={true}
                            variant={'ghost'}
                            colorScheme='blue'
                            aria-label='Account'
                            fontSize={36}
                            icon={<MdAccountCircle />}
                        />

                    </li> */}
                </ul>
            </div>
        </>
    );
}

export default Navbar;