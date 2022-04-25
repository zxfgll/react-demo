import React from 'react';

const Oauth = (props) => {
  // console.log(props);
  const {
    location: { hash },
  } = props;
  const params = hash.split('#')[1].split('&')
  const accessToken = params[0].split('=')[1]
//   const expires_in = params[2].split('=')[1]
  
  var query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
        title {
          romaji
          english
          native
        }
      }
    }
    `;

  // Define our query variables and values that will be used in the query request
  var variables = {
    id: 15125,
  };

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  const click = () => {
    fetch(url, options).then(handleResponse);
  };

  function handleResponse(response) {
    console.log(response);
  }

  return (
    <div>
      <a href="https://anilist.co/api/v2/oauth/authorize?client_id=8147&response_type=token">
        Login with AniList
      </a>
      <button onClick={click}>fetchData</button>
    </div>
  );
};

export default Oauth;