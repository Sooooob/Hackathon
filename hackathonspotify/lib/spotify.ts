const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async (code: string) => {
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

  if (!redirect_uri) {
    throw new Error("SPOTIFY_REDIRECT_URI is not defined");
  }

  let formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", code);
  formData.append("redirect_url", redirect_uri);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export { getAccessToken };
