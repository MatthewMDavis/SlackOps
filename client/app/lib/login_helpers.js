import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function xhrSignup(url, payload, options) {
  conn.post(url, payload, options)
  .then(response=> {
    return response.data;
  })
  .then(data=>{
    this.setState({ user:
                  {id: data.id,
                    url: data.url,
                    username: data.username},
                    showSignupModal: false });
  })
  .catch(ex=>{
    alert(ex);
    console.log(ex);
  });
}

export function xhrLogin(url, payload, options) {
  conn.post(url, payload, options)
  .then(response=> {
    return response.data;
  })
  .then(data=>{
    this.setState({ user:
                  {id: data.id,
                    url: data.url,
                    username: data.username},
                    showLoginModal: false });
  })
  .catch(ex=>{
    alert(ex);
    console.log(ex);
  });
}

export function xhrLogout(url, options) {
    conn.delete(url, options)
    .then(response=>{
      if (response.data.success) {
        this.setState({ user: null });
      }
    })
    .catch(ex=>{
      console.log(response.status);
    });
}

export function xhrFBCallback() {
        conn.get('/users/auth/facebook/callback', {})
        .then(response=> {
          return response.data;
        })
        .then(data=>{
          this.setState({ user:
                        {id: data.id,
                          url: data.url,
                          username: data.username},
                          showLoginModal: false });
        })
        .catch(ex=>{
          alert(ex);
          console.log(ex);
        });

}

