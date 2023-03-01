import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import TicketTypeDelete from '../components/TicketTypesDelete';
import TicketTypesEdit from '../components/TicketTypesEdit';
import TicketTypesAdd from '../components/TicketTypesAdd';

function TicketTypesTable() {
  const { t } = useTranslation('rootData');
  const { ticketTypes } = useSelector((state) => state.ticketTypes);

  return (
    <>
      <div className="flex justify-center w-48/100">
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  <TicketTypesAdd />
                </StyledTableCell>
                <StyledTableCell align="left">{t('NAME')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketTypes.map((types) => (
                <StyledTableRow key={types.id}>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <TicketTypesEdit ticketTypes={types} />
                      <TicketTypeDelete id={types.id} />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">{types.name}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TicketTypesTable;
