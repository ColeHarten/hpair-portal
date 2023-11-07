import {Button} from '@mui/material';

export default function ExternalLink({ to, children }) {
  const handleLinkClick = () => {
    const confirmed = window.confirm('You are about to leave this page. Do you want to continue?');
    if (confirmed) {
      window.location.href = to;
    }
  };

  return (
    <Button color="inherit" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
      {children}
    </Button>
  );
}