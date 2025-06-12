async function fetchProfileData(){
  const url = 'https://api.github.com/users/octocat';
  const fetching = await fetch(url);
  return await fetching.json();
}