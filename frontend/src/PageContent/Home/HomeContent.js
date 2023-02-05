import { useState } from 'react';
import Navbar from './components/navbar/Navbar';

function HomeContent() {
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <Navbar />
      <h1>Homee</h1>
    </>
  );
}
export default HomeContent;
