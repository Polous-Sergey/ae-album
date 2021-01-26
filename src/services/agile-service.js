export default class AgileService {
  baseUrl = 'http://interview.agileengine.com';
  apiKey = '23567b218376f79d9415';
  token = localStorage.getItem('token');

  authenticate = async () => {
    const res = await fetch(`${ this.baseUrl }/auth`, {
      body: JSON.stringify({ apiKey: this.apiKey }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const { token } = await res.json();
    if (token) {
      this.token = token;
      localStorage.setItem('token', token);
      return;
    }

    throw new Error('Can`t fetch token');
  };

  fetchImages = (page) => {
    return fetch(`${ this.baseUrl }/images?page=${ page }`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.token }`
      }
    });
  };

  getImages = async (page) => {
    const res = await this.fetchImages(page);
    if (res.status === 401) {
      await this.authenticate();
      const res = await this.fetchImages(page);
      return res.json();
    }
    return res.json();
  };

  fetchImage = (id) => {
    return fetch(`${ this.baseUrl }/images/${ id }`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.token }`
      }
    });
  };

  getImageDetails = async (id) => {
    const res = await this.fetchImage(id);
    if (res.status === 401) {
      await this.authenticate();
      const res = await this.fetchImage(id);
      return res.json();
    }
    return res.json();
  };
}
