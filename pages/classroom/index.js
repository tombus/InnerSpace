import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Classroom } from '@/components';
import { useAuth } from '@/components/hooks';

export default function ClassroomIndex() {
  const user = useAuth();
  return <>
    <Box m={4} width="100%">
      <Typography variant="h4" align="center">
        { user ? `${user.name}'s Classroom` : <Skeleton m={2} width={250}/> }
      </Typography>
      <Box p={2}>
        <Classroom />
      </Box>
    </Box>
  </>;
};
