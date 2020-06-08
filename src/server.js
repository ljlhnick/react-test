import axios from 'axios';
import qs from 'qs';

let http = {
    post: function (api, data) {
        let params = qs.stringify(data);
        return new Promise((resolve => {
            axios.post(api, params, {
                withCredentials: true
            }).then(res => {
                resolve(res);
            })
        }))
    },
    get: function (api, data) {
        let params = qs.stringify(data);
        return new Promise(resolve => {
            axios.get(api, params, {
                withCredentials: true
            }).then(res => {
                resolve(res);
            })
        })
    }
};

export default http