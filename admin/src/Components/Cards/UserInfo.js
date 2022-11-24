import React from "react";

// Importing style
import './cards.css';

// Importing images
import profileSelected from '../../images/profileSelected.png';
import EditProfile from "../../Widget/EditProfile";

const UserInfo = (details) => {

    const handleProfilePicture = () => {
        if (details.picture_url) {
            return details.picture_url;
        } else {return profileSelected;}
    }

    const profile_picture = handleProfilePicture()

    return(
        <div id={details.id} className="info_box">
            <div className="flex_between">
                <div className="flex"> 
                    <img className="user_profile_picture" src={profile_picture} alt="" />
                    <div> <h4 className="user_name"> {details.name} </h4> </div>
                </div>
                <div> <EditProfile data={details}></EditProfile></div>
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

export default UserInfo;