import Grid2 from "@mui/material/Unstable_Grid2"
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material"
import { OutlinedInput } from "@mui/material"
import axios from "axios"

import { useState, useRef, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/router"

export default function Calculator({ op, res }) {
  const [operation, setOperation] = useState(op[0] || "")
  const [result, setResult] = useState(res)
  const router = useRouter()
  // const first = useRef<HTMLInputElement>();
  // const second = useRef<HTMLInputElement>();

  // console.log(op)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value)
  }

  interface MyForm extends EventTarget {
    first: HTMLInputElement
    second: HTMLInputElement
  }

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as MyForm
    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    }
    console.log(query.first)

    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result)
        router.push({
          pathname: `/${query.operation}/${query.first}/${query.second}`,
          query: { res: res.data.result },
        })
      })
      .catch((err) => {
        setResult(err.response.data.message)
      })
  }

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              defaultValue={op[1] ? op[1] : ""}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={operation}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              defaultValue={op[2] ? op[2] : ""}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  )
}
