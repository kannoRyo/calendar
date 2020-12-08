import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';

// Style
const useStyles = makeStyles({
    table: {
    },
    item:{
      height:'80px',
      '&:hover':{
        backgroundColor:'#bdbdbd',
        fontWeight:'bold',
      }
    },
    currentMonth:{
      fontSize: '20px',
      fontWeight:'bold',
      textAlign:'center'
    },
    changeMonth:{
      display:'flex',
      justifyContent:'space-between'
    }
  });
//

const createData = (Sun, Mon, Tue, Wed, Thu, Fri, Sat) => {
    return {Sun,  Mon, Tue, Wed, Thu, Fri, Sat};
}
const d = new Date()

// const year = d.getFullYear()
// const month = d.getMonth()
const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ]

// カレンダー作成
const getCalendarHead = (year,month) =>{
    const dates=[]
    const  d =new Date(year,month,0).getDate();   
    const  n =new Date(year,month,1).getDay();   
    
    for(let i=0; i<n ; i++){
        dates.unshift(d-i)
    }

    return dates 
}

const getCalendarBody = (year,month)=>{
    const dates=[]
    const lastDate = new Date(year, month+1, 0).getDate()

    for(let i=1; i <= lastDate ;i++ ){
        dates.push(i)
    }

    return dates
}

const getCalendarTale = (year,month) =>{
    const dates=[]
    let n =new Date(year,month+1,1).getDay();   
    let i = 1

    for( n; n<=6 ; n++){
        dates.push(i)
        i++
    }

    return dates
}
const renderDates = (year,month)=>{
    const dates = [
        ...getCalendarHead(year,month),
        ...getCalendarBody(year,month),
        ...getCalendarTale(year,month)
    ]

    return dates
}
//　カレンダー作成　ここまで

const CalendarTop = ()=>{
    const classes = useStyles();
    const [year,setYear] = useState(d.getFullYear()) 
    const [month,setMonth] = useState(d.getMonth()) 

    const rows = [
      createData(...renderDates(year,month).splice(0,7)),
      createData(...renderDates(year,month).splice(7,7)),
      createData(...renderDates(year,month).splice(14,7)),
      createData(...renderDates(year,month).splice(21,7)),
      createData(...renderDates(year,month).splice(28,7)),
    ]

    const tableCellsHead = dayOfWeekStr.map((day,index)=>{
        return(
          <TableCell　align="center" key={index} >{day}</TableCell>            
        )
    })

    const nextMonth = ()=>{
      if(month === 11){
        setMonth(0)
        setYear(year+1)
      }else{
        setMonth(month + 1)
      }
    }

    const previousMonth = ()=>{
      if(month === 0){
        setMonth(11)
        setYear(year - 1)
      }else{
        setMonth(month - 1)
      }
    }

    const getNextMonth = ()=>{
      if(month===11){
        return 1
      }else{
        return month + 2
      }
    }

    const getPreviousMonth = ()=>{
      if(month===0){
        return 12
      }else{
        return month 
      }
    }

    return(
        <>
        <div className={classes.currentMonth}>{`${year}年　${month+1}月`}</div>
        <div className={classes.changeMonth}>
          <button onClick={()=> previousMonth()}>{`${getPreviousMonth()}月`}</button>
          <button onClick={()=> nextMonth()}>{`${getNextMonth()}月`}</button>
        </div>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableCellsHead}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow key={row.Mon}> 
                <TableCell align="center" className={classes.item}>{row.Sun}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Mon}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Tue}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Wed}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Thu}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Fri}</TableCell>
                <TableCell align="center" className={classes.item}>{row.Sat}</TableCell> 
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )
}

export default CalendarTop