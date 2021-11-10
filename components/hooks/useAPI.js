import useSWR from 'swr';
import putil from 'path';

// function that makes the HTTP request to the endpoint
// no need to worry about this much
async function fetcher(path){
  const fullPath = putil.join('/api', path);
  const res = await fetch(fullPath);
  const json = await res.json();
  return json;
}

export default function useAPI(path){
  const { data, error } = useSWR(path, fetcher);
  return {
    data: data,
    error: error,
    loading: !error && !data
  };
}
