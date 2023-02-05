import { Button, Drawer, Link, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

function Sidebar({ drawer, setDrawer }) {
  const matches = useMediaQuery('(min-width:768px)');
  return (
    <Drawer
      anchor="top"
      open={Boolean(drawer)}
      onClose={() => setDrawer(false)}
      PaperProps={{
        sx: { width: '20%' }
      }}>
      <Box sx={{ width: '35%' }}>
        <div className="flex md:flex-row flex-col  gap-4">
          <Link href="/">
            <Button variant="outlined">Home</Button>
          </Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </Box>
    </Drawer>
  );
}
export default Sidebar;
