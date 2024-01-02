import React from 'react'
import { Inputner, InputFound, InputSearch } from './css'
import { KeyboardVoiceRound } from '@ricons/material'
import { Icon } from '@ricons/utils'
const Input = (props) => {
    const onHandleSearch = () => {
        props.onHandleSearch()
    }
    return (
        <InputFound>
            {
                props.type === 'input' ?
                    <InputSearch onClick={() => { onHandleSearch() }} ></InputSearch>
                    :
                    <Inputner onClick={() => { onHandleSearch() }} ></Inputner>
            }

            <Icon color={'#fff'} size={24}>
                <KeyboardVoiceRound />
            </Icon>
        </InputFound>
    )
}
export default Input