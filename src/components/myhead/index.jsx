import React from 'react'
import { Inputner, InputFound } from './css'
import { SearchOutlined, EditNoteOutlined } from '@ricons/material'
import { Icon } from '@ricons/utils'
import { selectStatus, updateStatus } from '/@/redux/user'
import { useSelector, useDispatch } from 'react-redux'
const Input = (props) => {
    const status = useSelector(selectStatus)
    const dispatch = useDispatch();
    const onEditStatus = () => {
        props.onEditStatus()
    }
    const onHandleSearch = () => {
        props.onHandleSearch()
    }
    return (
        <InputFound>
            <Inputner onClick={() => { onEditStatus() }}>
                <span>{status}</span>
                <Icon color={'#fff'} size={20}>
                    <EditNoteOutlined />
                </Icon>
            </Inputner>
            <div className="rig" onClick={() => { onHandleSearch() }}>
                <Icon color={'#fff'} size={24}>
                    <SearchOutlined />
                </Icon>
            </div>
        </InputFound>
    )
}
export default Input