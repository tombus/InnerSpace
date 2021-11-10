import {
  Box,
  Typography
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Programs } from '@/components';
import { useAuth } from '@/components/hooks';

export default function StudentIndex() {
  const user = useAuth();
  return <>
    <Box m={4} width="100%">
      <Typography variant="h4" align="center">
        { user ? `${user.name}'s Programs` : <Skeleton m={2} width={200}/> }
      </Typography>
      <Box p={2}>
        <Programs />
      </Box>
    </Box>
  </>;
};
