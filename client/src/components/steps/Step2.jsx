import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
} from '@material-ui/core';
import React from 'react';
import {
    renderText,
    renderButton,
    renderInputText,
} from '../common/displayComponents';
import Step2b from './form_table';
export default function Step2({
    state,
    handleOnChange,
    handleNext,
    handlePrev,
}) {
    return (
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Box mt={1} mb={2}>
                    {renderText({ label: 'Educational Qualifications' })}
                    {!state.noneFilled
                        ? renderText({
                              label: '(fill in the details of SSC and one out of HSC or Diploma)',
                              variant: 'h8',
                              color: 'error',
                          })
                        : null}
                </Box>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label='Educational Qualifications'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Examination</TableCell>
                            <TableCell>
                                Name of the Institute or University
                            </TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Percentage of Marks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>SSC</TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'InstituteSSC',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'SSCFrom',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'SSCTo',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'SSCmarks',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>HSC</TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'InstituteHSC',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'HSCFrom',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'HSCTo',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'HSCmarks',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Diploma</TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'InstituteDiploma',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'DiplomaFrom',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'DiplomaTo',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'Diplomamarks',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {renderText({ label: 'Graduation/Post-Graduation Details' })}
                <Table aria-label='Educational Qualifications'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Examination</TableCell>
                            <TableCell>
                                Name of the Institute/University
                            </TableCell>
                            <TableCell>Specialization</TableCell>
                            <TableCell>Duration(From) </TableCell>
                            <TableCell>Duration(To) </TableCell>
                            <TableCell>
                                Final Year Percentage of marks
                            </TableCell>
                            <TableCell>Aggregate Percentage of marks</TableCell>
                            <TableCell>Total No. Backlogs(Dead)</TableCell>
                            <TableCell>Total No. Backlogs(Alive)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Graduation(passed)</TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'InstituteGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'SpecializationGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'GradFrom',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'GradTo',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'FinalYearMarksGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'AggregateMarksGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'DeadBacklogsGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'AliveBacklogGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Post Graduation</TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'InstitutePostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'SpecializationPostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'PostGradFrom',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'PostGradTo',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'FinalYearMarksPostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'AggregateMarksPostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'DeadBacklogsPostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                            <TableCell>
                                {renderInputText({
                                    label: '',
                                    name: 'AliveBacklogPostGrad',
                                    state,
                                    handleOnChange: handleOnChange,
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {renderText({ label: 'Other Courses Details' })}
            <Step2b />
            <Grid container spacing={2} justifyContent='space-between'>
                <Box p={2}>
                    {renderButton({ label: 'prev', handleOnClick: handlePrev })}
                </Box>
                <Box p={2}>
                    {renderButton({ label: 'next', handleOnClick: handleNext })}
                </Box>
            </Grid>
        </Paper>
    );
}
