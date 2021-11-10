import {
  Emotions1,
  Emotions2,
  Emotions3
} from '@/components';
import {
  useAuth,
  useAPI
} from '@/components/hooks';
import { Box } from '@material-ui/core';
import { useState } from 'react';

function getProgram() {
  const { data, loading, error } = useAPI('/programs');
  let program;
  (loading || !data) ? '' :
    data.result.map((obj, i) => {
      program = obj.questions
    });
  return program || [];
};

export default function Program() {
  let program = getProgram();
  const user = useAuth();
  const [ stage, setStage] = useState(0);
  const [ titleId, setTitleId ] = useState(0);
  const [ title, setTitle ] = useState('');
  const [ emotionId, setEmotionId ] = useState(0);
  const [ emotion, setEmotion ] = useState('');

  async function onSelect1(info) {
    setStage(stage + 1);
    setTitleId(info.id);
    setTitle(info.title);
  }

  function onSelect2(info) {
    setStage(stage + 1);
    setEmotionId(info.id);
    setEmotion(info.emotions[titleId]);
  }

  async function onSelect3() {
    setStage(stage + 1);
    try {
      await handleStudent();
      await handleResult();
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  async function handleStudent() {
    const res = await fetch(`/api/users/${user._id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({ lastOnline: new Date() })
    });
    await res.json();
  }

  async function handleResult() {
    const res = await fetch('/api/results', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        user: user._id,
        titleId: parseFloat(titleId),
        title: `${title}`,
        emotionId: parseInt(emotionId),
        emotion: `${emotion}`,
        date: new Date(),
      })
    });
    await res.json();
  }

  //TODO: pass the program data to these components...
  const stages = [
    <Emotions1 onSelect={ onSelect1 }
      intro={ program[0] }
    />,
    <Emotions2 onSelect={ onSelect2 }
      title={ title }
      titleId={ titleId }
      intro={ program[1] }
    />,
    <Emotions3 onSelect={ onSelect3 }
      title={ title }
      titleId={ titleId }
      emotion={ emotion }
      emotionId={ emotionId }
    />,
  ];

  return <>
    <Box width="100%" p={4}>
      { stages[stage] }
    </Box>
  </>
}
