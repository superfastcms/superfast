import {
  Box,
  BoxProps,
  Button,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RouterLink from '../Link';
import Cell from './Cell';
import { Props } from './types';

const Item = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    />
  );
};

const Table: React.FC<Props> = ({ label, columns, rows }) => {
  const { t } = useTranslation();

  const key = (row: unknown): String => {
    const data = row as Record<keyof { id: number }, unknown>;
    return data ? data.id.toString() : '';
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Item>
          <h1>{label}</h1>
        </Item>
        <Item>
          <Button variant="contained" component={RouterLink} to="create">
            {t('button.create')}
          </Button>
        </Item>
      </Box>
      <TableContainer component={Paper}>
        <MuiTable aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={`column-${column.field.field}`}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`row-${key(row)}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((col, i) => (
                  <TableCell key={`cell-${col.field.field}`} component="th" scope="row">
                    {col.customRenderCell ? (
                      col.customRenderCell(i, row, row[col.field.field])
                    ) : (
                      <Cell
                        colIndex={i}
                        type={col.field.type}
                        rowData={row}
                        cellData={row[col.field.field]}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

export default Table;
