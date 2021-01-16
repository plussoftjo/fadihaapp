import SocialType from './SocialType'

export const setExplorPosts = (item) => {
  return {
    type:SocialType.SET_EXPLOR_POSTS,
    payload:item
  }
}

export const setPost = (item) => {
  return {
    type:SocialType.SET_POST,
    payload:item
  }
}

export const setProfile = (item) => {
  return {
    type:SocialType.SET_PROFILE,
    payload:item
  }
}

export const setCreatePost = (item) => {
  return {
    type:SocialType.SET_CREATE_POST,
    payload:item
  }
}