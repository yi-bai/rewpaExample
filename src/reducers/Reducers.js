import {combineReducers} from 'redux';
import { createRewpa } from 'rewpa';

const paginationRewpa = createRewpa({
  pageNow: null,
  pageTotal: null,
  countEachPage: null
});

const photoRewpa = createRewpa(
{
  id: '',
  photoUrl: ''
});

const tagRewpa = createRewpa({
  id: '',
  tag: ''
});

const equipmentRewpa = createRewpa({
  id: '',
  equipment: ''
});

const userRewpa = createRewpa({
  id: '',
  avatarUrl: '',
  tags: [tagRewpa],
  equipments: [equipmentRewpa]
});

const locationRewpa = createRewpa({
  id: '',
  lat: '',
  lng: ''
});

const pinRewpa = createRewpa({
  lat: '',
  lng: ''
});

const blogRewpa = createRewpa({
  id: '',
  author: userRewpa
});

const profileRewpa = createRewpa(
{
  coverPhoto: photoRewpa,
  avatarUrl: '',
  firstName: '',
  lastName: '',
  country: '',
  aboutMe: '',
  countUserFollowing: 0,
  countUserFollower: 0,
  countPhotoSaved: 0,
  countPhotoUploaded: 0,
  countLocationTaken: 0,
  countLocationFollowing: 0,
  countPin: 0,
  countBlog: 0,
  tags: [tagRewpa],
  equipments: [equipmentRewpa],
  awards: ['']
}
);

const profileInputRewpa = createRewpa({
  coverPhotoId: null,
  tagSuggestions: [tagRewpa],
  equipmentSuggestions: [equipmentRewpa]
});

const createPaginationListRewpa = (Rewpa) => {
  return createRewpa({
    pagination: paginationRewpa,
    list: [Rewpa]
  });
};

const reducer = createRewpa({
  profile: profileRewpa,
  profileInput: profileInputRewpa,
  userFollowings: createPaginationListRewpa(userRewpa),
  userFollowers: createPaginationListRewpa(userRewpa),
  userSearchList: [userRewpa],
  userSameTagList: [userRewpa],
  userSameLocationList: [userRewpa],
  userSameEquipmentList: [userRewpa],
  photosSaved: createPaginationListRewpa(photoRewpa),
  photosTaken: createPaginationListRewpa(photoRewpa),
  locations: [locationRewpa],
  pinList: [pinRewpa],
  blogs: createPaginationListRewpa(blogRewpa),
  loading: ''
});

export default reducer;
