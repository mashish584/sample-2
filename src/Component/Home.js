import React, { useState, } from 'react'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { Graph } from 'react-d3-graph'

const Home = () => {
  const [name, setName] = useState('')
  const [allNames, setAllNames] = useState([])
  const [flag, setFlag] = useState(false)
  const [finalValues, setFinalValues] = useState({
    "payer": "",
    "payee": "",
    "amount": ""
  })
  const [items, setItems] = useState([])

  const { payer, payee, amount } = finalValues;

  const [graphData, setGraphData] = useState({})
  const [graphConfig, setGraphConfig] = useState({})

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
    setFlag(!false)
  }


  // function createData(payer, payee, amount) {
  //     return { payer, payee, amount };
  // }


  const myForm = () => {
    // var rows = []
    function addValues() {
      console.log("my Final values", finalValues);
      if ((finalValues['payer'] !== "") && (finalValues['payee'] !== "") && (finalValues['amount'] !== "")) {
        setItems([...items, finalValues])
      } else {
        alert("Enter all Fields")
      }
      setFinalValues({
        ...finalValues,
        "payer": "",
        "payee": "",
        "amount": ""
      })
    }
    return (
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Payer</TableCell>
              <TableCell align="center">Payee</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 && items.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" align="center" scope="row">
                  {row.payer}
                </TableCell>
                <TableCell align="center">{row.payee}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center">
                <FormControl>
                  <InputLabel>Payer</InputLabel>
                  <Select value={payer} onChange={handleFinalChange("payer")}>
                    {/* <MenuItem value="Select" dis selected>Select</MenuItem> */}
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
                    {/* <MenuItem value="Select" selected>Select</MenuItem> */}

                    {allNames.map(item =>
                    ((payer !== item.name) ? <MenuItem value={item.name}>{item.name}</MenuItem> : <></>
                    ))
                    }
                  </Select>
                </FormControl>
              </TableCell>


              <TableCell align="center">
                <FormControl>
                  <TextField
                    id="standard-number"
                    label="Amount"
                    type="number"
                    value={amount}
                    placeholder="Emter Amount"
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
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const handleTransactionDataSubmit = () => {
    console.log("Participants: ", allNames, " transactions: ", items)
    const data = {
      nodes: generateNodes(),
      links: generateLinks(),
    }
    const config = {
      nodeHighlightBehavior: true,
      node: {
        color: "lightgreen",
        highlightStrokeColor: "blue"
      },
      link: {
        highlightColor: "lightblue",
        renderLabel: true,
        labelProperty: "amount",
      },
      directed: true,
      height: 500,
      width: 500,
    };

    setGraphData(data)
    setGraphConfig(config)
  }

  const generateNodes = () => allNames.map(item => ({ id: item.name }))

  const generateLinks = () => items.map(item => ({ source: item.payer, target: item.payee, amount: item.amount }))

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
        {allNames && allNames.length ? (
          <>
            <div className="list-div">
              <div className="list-all-names">
                {listOfNames()}
              </div>
            </div>
            <Button variant="contained" color="secondary" onClick={handleOpenForm}>Submit</Button>
          </>
        ) : null}

      </div>

      <div className="form">
        {flag && myForm()}
      </div>

      {items && items.length ? (
        <Button variant="contained" color="secondary" onClick={handleTransactionDataSubmit}>Submit Data</Button>
      ) : null}

      {Object.keys(graphData).length && Object.keys(graphConfig).length ? (
        <Graph
          id="graph-id" // id is mandatory
          data={graphData}
          config={graphConfig}
        />
      ) : null}
    </>
  )
}

export default Home