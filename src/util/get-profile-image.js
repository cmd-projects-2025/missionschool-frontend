import profile1 from "./../assets/profile1.png";
import profile2 from "./../assets/profile2.png";
import profile3 from "./../assets/profile3.png";
import profile4 from "./../assets/profile4.png";

export function getProfileImage(profileId) {
  switch (profileId) {
    case 1:
      return profile1;
    case 2:
      return profile2;
    case 3:
      return profile3;
    case 4:
      return profile4;
    default:
      return null;
  }
}
