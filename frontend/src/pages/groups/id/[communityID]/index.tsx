import { Flex, Heading, Button, Box, Text } from '@chakra-ui/react'
import React from 'react'
import NavCommunity from 'src/components/group/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom";
import { userData } from '../../data';

const headCommunity = () => {
    let { communityID }: any = useParams<{ communityID: string }>()
    // const tags = [{ tagID: 1, tagName: "#Sport" }, { tagID: 2, tagName: "#Music" }, { tagID: 3, tagName: "#Gaming" }]

    const [tag, setTag] = useState(userData.Tag)
    const [tagColor, setTagColor] = useState(false)
    const [chooseTag, setChooseTag] = useState([])
    const [tagArray, setTagArray] = useState([])
    const handleTagOnlick = (obj) => () => {
        // console.log(obj)
        setChooseTag([...chooseTag, obj])
        setTagColor(!tagColor)
        setTag(tag.filter((item) => item.tagID !== obj.tagID))
        // console.log(chooseTag)
    }

    const handleTagDelete = (obj) => () => {
        setChooseTag(chooseTag.filter((item) => item != obj))
        setTag([...tag, obj])

    }
    const onSubmit = () => {
        setTagArray(chooseTag)
    }

    return <AppBody>
        <NavCommunity
            communityName='Passakorn group'
            isPrivate={false}
            isMember={true}
            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto laborum cumque nemo veniam amet fugiat beatae, quo magni eum voluptatem eligendi nesciunt numquam odio autem ex quaerat totam. At, facilis."}
            coverPhoto="https://picsum.photos/id/400/800"
            members={10}
            communityID={1000}
            tags={userData.Tag}
            activeBtn={1}
        /> */}

        <Text>community</Text>
        <Box>
            <Text>Modal</Text>
            <Box>
                {tag.map((tag) => <Button value={tag} onClick={handleTagOnlick(tag)}>{tag.tagName}}</Button>)}
            </Box>
            <Box>
                <Text>Show</Text>
                {chooseTag.map((tag) => <Button backgroundColor={"tomato"} onClick={handleTagDelete(tag)} value={tag}>{tag.tagName}</Button>)}
            </Box>
            <Button onClick={onSubmit}>Submit</Button>
        </Box>
        <Box>
            <Text>Preview</Text>
            <Box>
                {tagArray.map((tag) => <Button value={tag}>{tag.tagName}</Button>)}
            </Box>
        </Box>
    </AppBody>

}

export default headCommunity