import { Dispatch, SetStateAction } from 'react'
import {
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Button
} from '@chakra-ui/react'

import { MdSearch } from 'react-icons/md';

const Search = ({ placeholder, searchText, setSearchText, filter }: { placeholder: string, searchText: string, setSearchText: Dispatch<SetStateAction<any>>, filter: (value: string) => void }) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        filter(value)
    }

    return (
        <>
            <div id="search-wrapper" className='flex flex-row justify-start items-start gap-4 mb-6'>
                <InputGroup>
                    <Input
                        placeholder={placeholder}
                        value={searchText}
                        onChange={(e) => handleSearch(e)}
                    />
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