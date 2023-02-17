import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from 'PageContent/utils/TableStyles';
import EventTypesAdd from '../components/EventTypesAdd';
import EventTypesEdit from '../components/EventTypesEdit';
import EventTypeDelete from '../components/EventTypesDelete';

function EventTypesTable() {
  const { t } = useTranslation('rootData');
  const { eventTypes } = useSelector((state) => state.eventTypes);

  return (
    <>
      <div className="flex justify-center w-4/5">
        <TableContainer style={{ margin: 10, width: '50%' }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  <EventTypesAdd />
                </StyledTableCell>
                <StyledTableCell align="left">{t('NAME')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventTypes.map((types) => (
                <StyledTableRow key={types.id}>
                  <StyledTableCell align="left">
                    <div className="flex">
                      <EventTypesEdit eventType={types} />
                      <EventTypeDelete id={types.id} />
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
export default EventTypesTable;
