import axios from "axios";
import qs from "querystring";


export const apiCall = (
    url = "",
    method = "get",
    data = {},
    pagination = false
) => {
    let h = {};
    const accessToken = getStorage('access-token')
    const headers = {};
    headers.os = "web";
    if (accessToken) {
        headers['access-token'] = accessToken
    }
    headers.platform = "admin"
    return new Promise((resolve, reject) => {
        let config = {
            method: method,
            url:
                method === "get"
                    ? `/${url}?${qs.stringify(data)}`
                    : `/${url}`,
            data: (data),
            headers
        };

        axios(config)
            .then(res => {
                const result = res.data;
                if (pagination) {
                    result.data.count = Number(
                        res.headers["x-total-count"]
                            ? res.headers["x-total-count"]
                            : 0
                    );
                }
                resolve(result);
            })
            .catch(e => {
                const {status} = e.response;
                if(status == 403){
                    removeStorage('access-token');
                    removeStorage('name');
                    removeStorage('type');
                    window.location.href = "/";
                    return
                }

                reject(e);
            });
    });
};


export const validateEmail = (email)=>{

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePhone = (phone)=>{
  console.log(phone)
    const number = phone.toString() 
    var regex = /^\d{10}$/;

    return number.match(regex)

}



  export const validationHelper = (array,data)=>{

    let errors = {}

    array.filter((v,k)=>{

            if(v.is_required){
                if(!data[v.name]){
                    errors[v.name] = `${v.label} is required`;
                    return
                }
                if((v.is_email)){
                    if(!validateEmail(data[v.name])){
                        errors[v.name] = `${v.label} is invalid`;
                    }
                }

                if((v.is_phone)){
                    if(!validatePhone(data[v.name])){
                        errors[v.name] = `${v.label} is Invalid`;
                    }
                }
    
                return
            }
            
    })

    return errors
  }





