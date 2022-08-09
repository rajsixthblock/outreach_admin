import axios from 'axios';

const instance = axios.create({
   baseURL : process.env.REACT_APP_BACKEND_COMPANY_SERVICE,
  timeout: 15000,
});
instance.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


instance.interceptors.request.use(function (config) {
  
    // console.log(instance.defaults.headers.common['Authorization']);
    return config;
  }, function (error) {
    return Promise.reject(error);

  });
instance.interceptors.response.use(function (config) {
    
    return config;
  }, function (error) {
    
    
    if(error.response){
        if(error.response.status === 401||error.response.status === 403||error.response.status === 404 ){
          console.log(error.response);
           // localStorage.clear()
           // window.location = '/#/login';
            
        }
    }
    if(!error.response){
     
      // window.location = '/#/500';
    }
    return Promise.reject(error);
  });
export default instance;