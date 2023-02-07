
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';;
import ElemMapContent from './map';

export default function ElemContent({ ColorModeContext }) {

    console.log(ColorModeContext)

  const [map, setMap] = useState();
  const center = { lat: -15.762744, lng: -47.813301 };
  const zoom = 10;

  const [data, setData] = useState(initialState());
  
  const [value, setValue] = useState("1");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'row wrap'
                }}>
                <Box sx={{ flex: 1 }}>
                    <TabContext value={"0"}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList>
                                <Tab label="Mapa" value="0" />
                            </TabList>
                        </Box>
                        <TabPanel value="0">
                            <ElemMapContent tab={value} mode={mode} center={center} zoom={zoom} onClick={onClick} map={map} setMap={setMap} data={data} setData={setData} /></TabPanel>
                    </TabContext>
                </Box>
                <Box sx={{ flex: 1 }}>Chart js</Box>
            </Box>
            <Box> Table </Box>
        </Box>
    );
}