import React from "react";

// Importing style
import './cards.css';

// Importing images
import profileSelected from '../../images/profileSelected.png';
import EditProfile from '../../Widgets/EditProfile';

const ViewUserInfo = (details) => {

    const handleProfilePic = () => {
        if (details.picture_url){
            return details.picture_url;
        }
        return profileSelected;
    }

    const selected = handleProfilePic();

    return(
        <div id={details.id} className="info_box">
            <div className="flex_between">
                <div className="flex"> 
                    <img className="user_profile_picture" src={selected} alt="" />
                    <div> <h4 className="user_name"> {details.name} </h4> </div>
                </div>
                <div></div>
            </div>
            <div className="details"> 
                <div className="flex_between"> 
                    <div> 
                        <div className="space flex"> <p className="detail_title"> Email:</p> <p> {details.email} </p>  </div>
                        <div className="space flex"> <p className="detail_title"> Phone:</p> <p> {details.phone} </p>  </div>
                        <div className="flex"> <p className="detail_title"> Degree:</p> <p> {details.degree} </p>  </div>
                    </div>
                    <div> 
                        <div className="space flex"> <p className="detail_title"> Gender:</p> <p> {details.gender} </p> </div>
                        <div className="space flex"> <p className="detail_title"> Birthdate:</p> <p> {details.birthdate}</p>  </div>
                        <div className="flex"> <p className="detail_title"> Location:</p> <p> {details.location} </p> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUserInfo;