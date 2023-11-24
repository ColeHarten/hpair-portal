// ! This is the page that is rendered for events other than HCONF and ACONF. It is simpler and only shows some payment receipt information
// ! and various other success messaging

export default function SuccessPage({ user }) {
    const { confCode } = useParams();
    const [conferenceData, setConferenceData] = useState(null);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
        const conferenceData = await getConferenceData(confCode);
        setConferenceData(conferenceData);
        const userData = await getUserData(user);
        setUserData(userData);
        }
        fetchData();
    }, []);
    
    return (
        <Box sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url("art/shanghai.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white', // You can set the text color as needed
        maxHeight: '100vh',
        overflow: 'auto',
        }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            '@media (min-width:850px)': {
            flexDirection: 'row',
            },
        }}>
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '50%', // Adjusted width to take the full width on smaller screens
            }}>
            <Planet />
            </Box>
    
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '55%', // Adjusted width to take the full width on smaller screens
            }}
            >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
            }}>
                <Typography variant="h1" sx={{ fontSize: '3rem' }}>Success!</Typography>
                <Typography variant="h3" sx={{ fontSize: '2rem' }}>You're all set for {conferenceData?.name}!</Typography>
                <Typography variant="h3" sx={{ fontSize: '2rem' }}>Check your email for a receipt.</Typography>
                <Typography variant="h3" sx={{ fontSize: '2rem' }}>We'll see you there!</Typography>
            </Box>
            </Box>
        </Box>
        </Box>
    );
}