import { Component } from 'react'
import Api from './../../api/laravel/Api';
class Listing extends Component {
    async adminlogin(data) {
        return Api.post("/admin/login",data);
    }
    async addproperty(data) {
        return Api.post("/admin/add-property",data);
    }
    async city_list(id){
        return Api.get(`/admin/city-list/${id}`)
    }
    async area_list(id){
        return Api.get(`/admin/area-list/${id}`)
    }

    async Adminprofile(){
        return Api.get("/admin/admin-profile")
    }

    async Adminproperty(){
        return Api.get("/admin/property-list")
    }
    render() {
        return (
            <div >
                <></>
            </div>
        )
    }
}

export default Listing;