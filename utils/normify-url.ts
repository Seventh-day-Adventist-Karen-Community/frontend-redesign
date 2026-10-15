import { local_url } from "../apollo-client"

export const NormifyURL = (url:string) =>{
    if(!url)
      return ''
    if(process.env.NODE_ENV =='development'){
        return(local_url+url)
    }
    return url
}

export const NormifyB64 = (unNormalB64:string) =>{
    const id = unNormalB64
    const b64Id = id.replaceAll('%3D','=')
    return b64Id
}


export const NormifyTimeStatement = () =>{
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
        return('Good Morning')
    } else if (curHr < 18) {
        return('Good Afternoon')
    } else {
        return('Good Evening')
    }
}