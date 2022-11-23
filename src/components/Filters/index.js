/**
 * Copyright (C) 2019 European Spallation Source ERIC.
 * <p>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * <p>
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * <p>
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
import React, {useState} from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import {dateToString} from '../../utils/utils';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { InputGroup } from 'react-bootstrap';
import DateSelectorModal from './DateSelectorModal';
import MultiSelect from '../input/MultiSelect';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateSearchParams as updateSearchParamsAction } from '../../features/searchParamsReducer';
import { updateSearchPageParams as updateSearchPageParamsAction } from '../../features/searchPageParamsReducer';
import Collapse from './Collapse';
import Col from 'react-bootstrap/Col';
import TextInput from '../input/TextInput';

/**
 * Component holding search criteria elements, i.e.
 * logbooks, tags and time range.
 */
const Filters = ({showFilters, logbooks, tags, searchParams, searchPageParams}) => {

    const [tempSearchParams, setTempSearchParams] = useState({...searchParams});
    const [tempSearchPageParams, setTempSearchPageParams] = useState({...searchPageParams});
    const dispatch = useDispatch();

    useEffect(() => {
        setTempSearchParams(searchParams);
        setTempSearchPageParams(searchPageParams);
    }, [searchParams, searchPageParams])

    const submitSearchParams = () => {
        dispatch(updateSearchParamsAction(tempSearchParams));
        dispatch(updateSearchPageParamsAction(tempSearchPageParams));
    }

    const { control, handleSubmit, getValues, setValue } = useForm({defaultValues: {...tempSearchParams}});

    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const [showSelectStartTime, setShowSelectStartTime] = useState(false);
    const [showSelectEndTime, setShowSelectEndTime] = useState(false);

    // Instead of triggering submit of search parameters directly from a field change
    // function as a side effect (bad practice, which ofc generates warnings), instead
    // set the triggerSubmit state to true and then submit the search parameters from useEffect.
    useEffect(() => {
        if(triggerSubmit) {
            setTriggerSubmit(false);
            submitSearchParams();
        }
        // eslint-disable-next-line
    }, [triggerSubmit]);
    
    const onSubmit = (data) => {
        // Remove keys part of page params
        delete data.sort

        // Update the search params and trigger submit
        setTempSearchParams({...data});
        setTriggerSubmit(true);
    }

    const onSearchParamFieldValueChanged = (field, value, submit=true) => {
        field.onChange(value);
        updateSearchParams(field.name, value, submit);
    }

    const onSearchPageParamFieldValueChanged = (field, value, submit=true) => {
        field.onChange(value);
        updateSearchPageParams(field.name, value, submit);
    }

    const updateSearchParams = (key, value, submit=true) => {
        const updatedParams = {...tempSearchParams, [key]: value}
        setTempSearchParams(updatedParams);
        if(submit) {
            // better to only trigger re-render if true
            setTriggerSubmit(true);
        }
    }

    const updateSearchPageParams = (key, value, submit=true) => {
        const updatedParams = {...searchPageParams, [key]: value}
        setTempSearchPageParams(updatedParams);
        if(submit) {
            // better to only trigger re-render if true
            setTriggerSubmit(true);
        }
    }

    const toDate = (dateString) => {
        if(!dateString || (dateString && dateString.trim() === '')) {
            return new Date();
        } else {
            return new Date(dateString);
        }
    }

    return(
        <Collapse show={showFilters} onExiting={handleSubmit(onSubmit)} >
            <Col xs={{span: 12, order: 3}} lg={{span: 2, order: 1}} >
                <Container className="grid-item filters full-height" style={{padding: "8px"}} >
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {/* Hidden button handles submit-on-enter automatically */}
                        <Button type='submit' hidden >Submit</Button>
                        <TextInput 
                            name='title'
                            label='Title'
                            control={control}
                            defaultValue=''
                        />
                        <TextInput 
                            name='desc'
                            label='Text'
                            control={control}
                            defaultValue=''
                        />
                        <Form.Group controlId='logbooks'>
                            <Form.Label>Logbooks</Form.Label>
                            <Controller 
                                name='logbooks'
                                control={control}
                                defaultValue={[]}
                                render={({field})=>
                                    <MultiSelect
                                        inputId={field.name}
                                        options={logbooks.map(it => (
                                            {label: it.name, value: it}
                                        ))}
                                        selection={field.value.map(it => (
                                            {label: it, value: it}
                                        ))}
                                        onSelectionChanged={selection => onSearchParamFieldValueChanged(field, selection.map(it => it.label))}
                                    />
                            }/>
                        </Form.Group>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <Controller 
                                name='tags'
                                control={control}
                                defaultValue={[]}
                                render={({field})=>
                                    <MultiSelect
                                        inputId={field.name}
                                        options={tags.map(it => (
                                            {label: it.name, value: it}
                                        ))}
                                        selection={field.value.map(it => (
                                            {label: it, value: it}
                                        ))}
                                        onSelectionChanged={selection => onSearchParamFieldValueChanged(field, selection.map(it => it.label))}
                                    />
                            }/>
                        </Form.Group>
                        <TextInput 
                            name='owner'
                            label='Author'
                            control={control}
                            defaultValue={tempSearchParams.owner || ''}
                        />
                        <Form.Group controlId='start'>
                            <Form.Label>Start Time</Form.Label>
                            <InputGroup>
                                <Controller 
                                    name='start'
                                    control={control}
                                    defaultValue=''
                                    render={({field}) =>
                                        <>
                                            <Form.Control size="sm"
                                                type="text"
                                                value={field.value}
                                                ref={field.ref}
                                                onChange={event => onSearchParamFieldValueChanged(field, event.target.value || '', true)}
                                            />
                                            <InputGroup.Append>
                                                <Button size="sm" onClick={() => setShowSelectStartTime(true)}><FaCalendarAlt/></Button>
                                            </InputGroup.Append>
                                        </>
                                }/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId='end'>
                            <Form.Label>End Time</Form.Label>
                            <InputGroup>
                                <Controller 
                                    name='end'
                                    control={control}
                                    defaultValue=''
                                    render={({field}) =>
                                        <>
                                            <Form.Control size="sm"
                                                type="text"
                                                value={field.value}
                                                ref={field.ref}
                                                onChange={event => onSearchParamFieldValueChanged(field, event.target.value || '', true)}
                                            />
                                            <InputGroup.Append>
                                                <Button size="sm" onClick={() => setShowSelectEndTime(true)}><FaCalendarAlt/></Button>
                                            </InputGroup.Append>
                                        </>
                                }/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId='sort'>
                            <Controller 
                                name='sort'
                                control={control}
                                defaultValue={searchPageParams.sort || ''}
                                render={({field}) =>
                                    <>
                                        <Form.Check style={{paddingTop: "5px"}}
                                            type='radio'
                                            id='sortDescending'
                                            checked={field.value === 'down'}
                                            label='Sort descending on date'
                                            onChange={() => onSearchPageParamFieldValueChanged(field, 'down', true)}
                                        />
                                        <Form.Check 
                                            type='radio'
                                            id='sortAscending'
                                            label='Sort ascending on date'
                                            checked={field.value === 'up'}
                                            onChange={(e) => onSearchPageParamFieldValueChanged(field, 'up', true)}
                                        />
                                    </>
                            }/>
                            
                        </Form.Group>
                        <TextInput 
                            name='attachments'
                            label='Attachments'
                            control={control}
                            defaultValue={tempSearchParams.attachments || ''}
                        />
                    </Form>
                </Container>
                {
                    <DateSelectorModal 
                        rules={{
                            validate: {
                                timeParadox: val => {
                                    const endDateString = getValues('end');
                                    if(endDateString === '') {
                                        return true;
                                    } else {
                                        return val <= toDate(endDateString) || 'Start date cannot come after end date'
                                    }
                                }
                            }
                        }}
                        title='Select Start Time'
                        show={showSelectStartTime}
                        setShow={setShowSelectStartTime}
                        onApply={(data) => {
                            const dateString = dateToString(data.datetime);
                            setValue('start', dateString);
                            updateSearchParams('start', dateString, true);
                        }}
                    />
                }
                {
                    <DateSelectorModal 
                        rules={{
                            validate: {
                                timeParadox: val => {
                                    const startDateString = getValues('start');
                                    if(startDateString === '') {
                                        return true;
                                    } else {
                                        return toDate(startDateString) <= val || 'End date cannot come before start date';
                                    }
                                }
                            }
                        }}
                        title='Select End Time'
                        show={showSelectEndTime}
                        setShow={setShowSelectEndTime}
                        onApply={(data) => {
                            const dateString = dateToString(data.datetime);
                            setValue('end', dateString);
                            updateSearchParams('end', dateString, true);
                        }}
                    />
                }
            </Col>
        </Collapse>
    );
}

export default Filters;
