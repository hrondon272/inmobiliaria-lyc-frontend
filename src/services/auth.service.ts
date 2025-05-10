import { HTTP } from "../plugins/axios"

export const login = async (email: string, password: string) => {

    try {
        return await HTTP.post('/auth/login', {
            email: email,
            password: password
        });
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyInfo = async () => {
    return await HTTP.get('/auth/companyInfo');
}

export const logout = async () => {
    return await HTTP.post('/logout');
}

export const setCookie = (name: string, value: string, expires: number, path = "/") => {
    const date = new Date()
    date.setMinutes(date.getMinutes() + expires)
    const cookie = `${name}=${value};expires=${date};path=${path};`
    document.cookie = cookie
}

export const getCookie = (name: string) => {
    const cookies = document.cookie.split(";")
  
    let responseValue = null
    for (const i in cookies) {
      const [key, ...value] = cookies[i].split("=")
      if (key.trim() == name) {
        responseValue = value.join("=")
        break
      }
    }
    return responseValue
}

export const deleteCookie = (name: string, path = "/") => {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=${path};`;
};