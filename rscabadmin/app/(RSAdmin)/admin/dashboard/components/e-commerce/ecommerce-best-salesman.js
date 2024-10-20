import PropTypes from 'prop-types';
// @mui
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// utils
import { fCurrency } from '@/app/(RSAdmin)/admin/utils/format-number';
// components
import Label from '@/app/(RSAdmin)/admin/common/label';
import Iconify from '@/app/(RSAdmin)/admin/common/iconify';
import Scrollbar from '@/app/(RSAdmin)/admin/common/scrollbar';
import { TableHeadCustom } from '@/app/(RSAdmin)/admin/common/table';

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 640 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

EcommerceBestSalesman.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function EcommerceBestSalesmanRow({ row }) {
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row.name} src={row.avatarUrl} sx={{ mr: 2 }} />
        {row.name}
      </TableCell>

      <TableCell>{row.category}</TableCell>

      <TableCell align="center">
        <Iconify icon={row.flag} sx={{ borderRadius: 0.65, width: 28 }} />
      </TableCell>

      <TableCell align="right">{fCurrency(row.totalAmount)}</TableCell>

      <TableCell align="right">
        <Label
          variant="soft"
          color={
            (row.rank === 'Top 1' && 'primary') ||
            (row.rank === 'Top 2' && 'info') ||
            (row.rank === 'Top 3' && 'success') ||
            (row.rank === 'Top 4' && 'warning') ||
            'error'
          }
        >
          {row.rank}
        </Label>
      </TableCell>
    </TableRow>
  );
}

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.object,
};
