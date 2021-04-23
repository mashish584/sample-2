import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, TableCell, TableContainer, Paper, Table, TableHead, TableRow, TableBody, } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { DataGrid } from '@material-ui/data-grid';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         height: 600,
//         width: '100%',
//         '& .MuiFormGroup-options': {
//             alignItems: 'center',
//             paddingBottom: theme.spacing(1),
//             '& > div': {
//                 minWidth: 100,
//                 margin: theme.spacing(2, 2, 2, 0),
//             },
//         },
//     },
// }));

const Home = () => {
    const [name, setName] = useState('')
    const [allNames, setAllNames] = useState([])
    const [flag, setFlag] = useState(false)
    // const [payer, setPayer] = useState('')
    // const [payee, setPayee] = useState('')
    // const [amount, setAmount] = useState('')
    const [finalValues, setFinalValues] = useState({
        "payer": "",
        "payee": "",
        "amount": ""
    })
    const [items, setItems] = useState([])

    const { payer, payee, amount } = finalValues;

    const handleFinalChange = name => event => {
        setFinalValues({ ...finalValues, [name]: event.target.value })
    }


    const handleChange = (event) => {
        setName(event.target.value)
    }

    const addParticipant = event => {
        event.preventDefault();
        setAllNames(previous => [{ name }, ...previous])
        setName('')
    }

    const listOfNames = () => {
        return (
            <div className="allnames">
                <h3>Names</h3>

                {allNames.map(item => (
                    <h4> { item.name}</h4>
                ))
                }
            </div>
        )
    }

    const handleOpenForm = () => {
        setFlag(true)
        // myForm1()
    }

    // const myForm = () => {
    //     return (
    //         <div className="form-names">
    //             <FormControl>
    //                 <InputLabel>Payer</InputLabel>
    //                 <Select value={payer} onChange={handlePayerChange}>
    //                     <MenuItem value="Commodity" selected>Commodity</MenuItem>
    //                     {allNames.map(item => (
    //                         <MenuItem value={item.name}>{item.name}</MenuItem>
    //                     ))
    //                     }
    //                 </Select>
    //             </FormControl>
    //             <FormControl>
    //                 <InputLabel>Payee</InputLabel>
    //                 <Select value={payee} onChange={handlePayeeChange}>
    //                     {allNames.map(item => (
    //                         <MenuItem value={item.name}>{item.name}</MenuItem>
    //                     ))
    //                     }
    //                 </Select>
    //             </FormControl>
    //             <FormControl>
    //                 <TextField
    //                     id="standard-number"
    //                     label="Number"
    //                     type="number"
    //                     value={amount}
    //                     onChange={handleAmountChange}
    //                     InputLabelProps={{
    //                         shrink: true,
    //                     }}
    //                 />


    //             </FormControl>
    //             <Button
    //                 size="small"
    //                 variant="outlined"
    //                 color="primary"
    //             >
    //                 <KeyboardArrowRightIcon fontSize="small" /> ADD+
    //                  </Button>

    //         </div>
    //     )
    // }


    function createData(payer, payee, amount) {
        return { payer, payee, amount };
    }


    const myForm1 = () => {
        var rows = []
        function addValues() {
            console.log(finalValues);
            setItems([...items, finalValues])
            rows = [createData(finalValues['payer'], finalValues['payee'], finalValues['amount'])]
        }
        // items.map(item => {  
        //     rows.push(createData(item.payer, item.payee, item.amount))
        // })
        // rows = [createData(finalValues['payer'], finalValues['payee'], finalValues['amount'])]

        // rows = [
        //     createData(payer, payee, amount)
        // ];
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Payer</TableCell>
                            <TableCell align="center">Payee</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <FormControl>
                                    <InputLabel>Payer</InputLabel>
                                    <Select value={payer} onChange={handleFinalChange("payer")}>
                                        <MenuItem value="Select" selected>Select</MenuItem>
                                        {allNames.map(item => (
                                            <MenuItem value={item.name} >{item.name}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                            </TableCell>


                            <TableCell align="center">
                                <FormControl>
                                    <InputLabel>Payee</InputLabel>
                                    <Select value={payee} onChange={handleFinalChange("payee")}>
                                        <MenuItem value="Select" selected>Select</MenuItem>

                                        {allNames.map(item =>
                                        ((payer != item.name) ? <MenuItem value={item.name}>{item.name}</MenuItem> : <></>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                            </TableCell>


                            <TableCell align="center">
                                <FormControl>
                                    <TextField
                                        id="standard-number"
                                        label="Number"
                                        type="number"
                                        value={amount}
                                        onChange={handleFinalChange("amount")}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </TableCell>


                            <TableCell align="center">
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    onClick={(e) => { addValues() }}
                                >
                                    <KeyboardArrowRightIcon fontSize="small" /> ADD+
                                </Button>

                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.length > 0 && items.map((row) => (
                            // <TableRow key={row.name}>
                            //     <TableCell component="th" scope="row">
                            //         {row.payer}
                            //     </TableCell>
                            //     <TableCell align="right">{row.payee}</TableCell>
                            //     <TableCell align="right">{row.amount}</TableCell>
                            // </TableRow>


                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <FormControl>
                                            <InputLabel>Payer</InputLabel>
                                            <Select value={row.payer} disabled onChange={handleFinalChange("payer")}>
                                                {/* <MenuItem value="Select" selected>Select</MenuItem>
                                            {allNames.map(item => (
                                                <MenuItem value={item.name} >{item.name}</MenuItem>
                                            ))
                                            } */}
                                            </Select>
                                        </FormControl>
                                    </TableCell>


                                    <TableCell align="center">
                                        <FormControl>
                                            <InputLabel>Payee</InputLabel>
                                            <Select value={row.payee} disabled onChange={handleFinalChange("payee")}>
                                                {/* <MenuItem value="Select" selected>Select</MenuItem>
    
                                            {allNames.map(item =>
                                            ((payer != item.name) ? <MenuItem value={item.name}>{item.name}</MenuItem> : <></>
                                            ))
                                            } */}
                                            </Select>
                                        </FormControl>
                                    </TableCell>


                                    <TableCell align="center">
                                        <FormControl>
                                            <TextField
                                                id="standard-number"
                                                label="Number"
                                                type="number"
                                                value={row.amount}
                                                onChange={handleFinalChange("amount")}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                disabled
                                            />
                                        </FormControl>
                                    </TableCell>


                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            onClick={(e) => { addValues() }}
                                            disabled
                                        >
                                            <KeyboardArrowRightIcon fontSize="small" /> ADDED
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


    // const handlePayerChange = (e) => {
    //     setPayer(e.target.value)
    // }

    // const handlePayeeChange = (e) => {
    //     setPayee(e.target.value)
    // }

    // const handleAmountChange = (e) => {
    //     setAmount(e.target.value)
    // }

    return (
        <>
            <div className="name-component">
                <div className="p-name">
                    <h2>Enter Participant's name</h2>
                    <div className="p-name-field">
                        <TextField id="outlined-basic" label="Participant Name"
                            variant="outlined"
                            value={name}
                            disabled={flag}
                            onChange={handleChange} />
                    </div>
                    <Button variant="contained"
                        color="primary"
                        // onClick={() => { addParticipant() }}>
                        onClick={addParticipant}
                    >
                        Add
                </Button>
                </div>
                {
                    console.log(allNames)
                }
                <div className="list-div">
                    <div className="list-all-names">
                        {listOfNames()}
                    </div>
                </div>

                <Button variant="contained" color="secondary" onClick={handleOpenForm}>
                    Submit
            </Button>
            </div>

            <div className="form">
                {flag && myForm1()}
            </div>
        </>
    )
}

export default Home