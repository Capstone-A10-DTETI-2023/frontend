import {
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Button
} from '@chakra-ui/react'

import { MdSearch } from 'react-icons/md';

const Search = () => {
    return (
        <>
            <div id="search-wrapper" className='flex flex-row justify-start items-start gap-4 mb-6'>
                <InputGroup>
                    <Input placeholder='Search your node here..' />
                    <InputRightElement>
                        <Icon as={MdSearch} />
                    </InputRightElement>
                </InputGroup>

                <div id="button-wrapper" className="w-fit">
                    <Button colorScheme='blue'>Search</Button>
                </div>
            </div>
        </>
    );
}

export default Search;