const userApiUrl = "http://localhost:60222/api/auth";
const pointsApiUrl = "http://localhost:60222/api/points"

const getRequestOptionsPost = (body, auth) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (auth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  return {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };
};

const getRequestOptionsGet = (auth) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (auth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  return {
    method: "GET",
    headers: headers,
  };
};

const getRequestOptionsDelete = (auth) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (auth) {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  return {
    method: "DELETE",
    headers: headers,
  };
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function userLogIn(username, password) {
  try {
    const body = {
      username: username,
      password: password,
    };
    const requestOptions = getRequestOptionsPost(body, false);

    await delay(1000);

    const response = await fetch(userApiUrl + "/log-in", requestOptions);

    if (response.ok) {
      localStorage.setItem("authToken", await response.text());
      return;
    }

    if (response.status === 400) {
      const errorData = await response.json();

      if (errorData.params) {
        console.error("Ошибка формата JSON:", errorData.params);
        return;
      }

      const errors = Object.keys(errorData).reduce((acc, key) => {
        if (key !== 'timestamp') {
          acc[key] = errorData[key];
        }
        return acc;
      }, {});

      return errors;
    }

    console.error("Произошла ошибка при авторизации пользователя:", response.statusText);
    return null;

  } catch (error) {
    console.error("Произошла ошибка при авторизации пользователя:", error);
    return null;
  }
}

export async function userSignUp(username, password) {
  try {
    const body = {
      username: username,
      password: password,
    };
    const requestOptions = getRequestOptionsPost(body, false);

    await delay(1000);

    const response = await fetch(userApiUrl + "/sign-up", requestOptions);

    if (response.ok) {
      await userLogIn(username, password);
      return;
    }

    if (response.status === 400) {
      const errorData = await response.json();

      if (errorData.params) {
        console.error("Ошибка формата JSON:", errorData.params);
        return;
      }

      const errors = Object.keys(errorData).reduce((acc, key) => {
        if (key !== 'timestamp') {
          acc[key] = errorData[key];
        }
        return acc;
      }, {});

      return errors;
    }

    console.error("Произошла ошибка при регистрации пользователя:", response.statusText);
    return null;

  } catch (error) {
    console.error("Произошла ошибка при регистрации пользователя:", error);
    return null;
  } 
}

export async function checkToken() {
  try {

    const token = localStorage.getItem('authToken');
    if (!token) return false;

    const requestOptions = getRequestOptionsGet(true);
    const response = await fetch(userApiUrl, requestOptions);

    if (!response.ok) {
      console.error("Ошибка запроса:", response.status, await response.text());
      return false;
    }

    return response.ok;
  } catch (error) {
    console.error("Произошла ошибка при проверке токена пользователя:", error)
    return false;
  }
}

export async function getUser() {
  try {
    
    const requestOptions = getRequestOptionsGet(true);
    const response = await fetch(userApiUrl, requestOptions);

    if (!response.ok) {
      console.error("Ошибка запроса:", response.status, await response.text());
      return false;
    }

    return await response.json()
  } catch (error) {
    console.error("Произошла ошибка при получении пользователя:", error)
    return false;
  }
}

export async function checkPoint(data) {
  try {
    const body = {
      x: data.x,
      y: data.y,
      r: data.r
    }
    const requestOptions = getRequestOptionsPost(body, true);

    await delay(1000);

    const response = await fetch(pointsApiUrl, requestOptions);

    if (response.ok) {
      data = await response.json();
      return data.inArea;
    }

    console.error("Произошла ошибка при проверке точки: ", response.statusText)
    return null;
  } catch(error) {
    console.error("Произошла ошибка при проверке точки")
    return null;
  }
}

export async function getPoints() {
  try {
    const requestOptions = getRequestOptionsGet(true);
    const response = await fetch(pointsApiUrl, requestOptions);

    if (!response.ok) {
      console.error("Ошибка запроса:", response.status, await response.text());
      return false;
    }

    return await response.json()
  } catch (error) {
    console.error("Произошла ошибка при получении пользователя:", error)
    return false;
  }
}

export async function deletePoints() {
  try {
    const requestOptions = getRequestOptionsDelete(true);
    const response = await fetch(pointsApiUrl, requestOptions);

    if (!response.ok) {
      console.error("Ошибка запроса:", response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Произошла ошибка при удалении точек:", error)
    return false;
  }
}