import { Box } from '@material-ui/core';
import { Completion } from '@/components';
import { useAuth } from '@/components/hooks';

export default function StudentCompletion() {
  const user = useAuth();
  const name = (!user || !user.name) ? null : `${user.name}`;
  return <>
    <Box m={4} width="100%">
      <Box p={2}>
        <Completion user={ name } />
      </Box>
    </Box>
  </>;
}
