import {
  colors,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
import EmotionsData from './EmotionsData';

const rows = EmotionsData(0);
const columns = EmotionsData(1);
const colorlist = EmotionsData(2);
const header = EmotionsData(3);
const body = EmotionsData(4);
const useStyles = makeStyles(theme => ({
  root: { width: '100%' },
  table: { minWidth: 650 },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  switch: { padding: 10 },
}));

export default function EmotionTable({ intro, data }) {
  const classes = useStyles();
  // check if even
  const iseven = (id) => { return (id % 2 === 0) ? true : false; };

  // convert old numbers to even
  const convertodd = (id) => { return id % 2 !== 0 ? Math.floor(id /= 2) : null; };
  const converteven = (id) => { return id % 2 === 0 ? Math.floor(id /= 2) : null; };

  // count if titleId && emotionId match, then count last row for emotions total
  function counter(id, eid) {
    let count = 0;
    data.map(obj => {
      count += (obj.titleId === id && obj.emotionId == eid) ? 1 : (eid > 5 && obj.titleId === id) ? 1 : 0
    });
    return count;
  };

  // count all totals in results
  function total() {
    let total = 0;
    data.map(obj => { total += (obj.titleId !== null) ? 1 : 0 });
    return total;
  };

  return <>
    <div className={ classes.root }>
      <TableContainer component={ Paper }>
        <Typography className={ classes.title }>{ intro }</Typography>
        <Table className={ classes.table } size="small" stickyHeader>
          <caption style={ {
            textAlign: 'right',
            fontSize: 22, fontWeight: 600
          } }>TOTAL: { total() }</caption>
          <TableHead>
            <TableRow>
              { header.map((col) => (
                <TableCell
                  key={ col.id }
                  align={ col.numeric ? 'left' : 'right' }
                  padding={ col.disablePadding ? 'none' : 'default' }
                  style={ {
                    padding: 12,
                    fontSize: 16,
                    fontWeight: 800,
                    minWidth: col.minWidth,
                    color: colorlist[converteven(col.id)],
                    backgroundColor: colors.grey[100]
                  } }>
                  { col.label }
                </TableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((i) => {
              return (
                <TableRow hover role="checkbox" key={ i }>
                  { body.map((row, j) => {
                    const value = columns[convertodd(j)];
                    return (
                      <TableCell key={ j }
                        align={ row.numeric ? 'left' : 'right' }
                        padding={ row.disablePadding ? 'none' : 'default' }
                        style={ {
                          height: row.height,
                          minWidth: row.minWidth,
                          padding: i === 6 ? 11 : null,
                          fontSize: i === 6 ? 15 : 12,
                          fontWeight: (i === 6 || !iseven(row.id)) ? 700 : null,
                          backgroundColor: i === 6 ? colors.grey[100] : null,
                          color: (iseven(row.id) && i === 6) ? colorlist[converteven(row.id)] : null
                        } }>{ iseven(row.id) ? row.label[i] : counter(value, i) }
                      </TableCell>
                    );
                  }) }
                </TableRow>
              );
            }) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>
}
