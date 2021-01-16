import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Layout, Text, Icon, Input, Spinner } from "@ui-kitten/components";
import { Octicons, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import { Video } from "expo-av";
// Components

// Stores
import { connect } from "react-redux";

import { ContentCard } from "../../../components";
import { env } from "../../../constants";
import { apis } from "../../../services";

// styles
import styles from "./styles";
import { PanGestureHandler, State } from "react-native-gesture-handler";

let Home = (props) => {
  let [showComment, setShowComment] = React.useState(false);
  let [like, setLike] = React.useState(false);
  let [likesCount, setLikesCount] = React.useState(0);
  let [posts, setPosts] = useState([]);
  let [post, setPost] = useState(null);
  let [postindex, setPostIndex] = useState(0);
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);
  useEffect(() => {
    setPosts(props.social.explorPosts);
    if (props.social.explorPosts.length >= 1) {
      setPost(props.social.explorPosts[postindex]);
      // Likes Controller -------
      setLikesCount(props.social.explorPosts[postindex].likes.length);
      let _hasLike = false;
      props.social.explorPosts[postindex].likes.forEach((trg, index) => {
        if (trg.user_id == props.user.id) {
          _hasLike = true;
        }
      });
      setLike(_hasLike);
      // Comments Controller
      setComments(props.social.explorPosts[postindex].comments);
    }
  }, []);

  let _changeVideo = (event) => {
    if (event.nativeEvent.translationY <= -50) {
      let _index = postindex + 1;
      if (_index >= posts.length) {
        _index = postindex;
        alert("No more video");
      } else {
        setPostIndex(_index);
        setShowComment(false)
        setPost(posts[_index]);
        // Likes Controller -------
        setLikesCount(posts[_index].likes.length);
        let _hasLike = false;
        posts[_index].likes.forEach((trg, index) => {
          if (trg.user_id == props.user.id) {
            _hasLike = true;
          }
        });
        setLike(_hasLike);
        setComments(posts[_index].comments);
      }
    }
    if (event.nativeEvent.translationY >= 50) {
      if (postindex !== 0) {
        let _index = postindex - 1;
        setPostIndex(_index);
        setPost(posts[_index]);
        setShowComment(false)
        // Likes Controller -------
        setLikesCount(posts[_index].likes.length);
        let _hasLike = false;
        posts[_index].likes.forEach((trg, index) => {
          if (trg.user_id == props.user.id) {
            _hasLike = true;
          }
        });
        setLike(_hasLike);
        setComments(posts[_index].comments);
      }
    }
  };

  let _likeController = () => {
    if (like) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLike(!like);

    apis.social.like(
      {
        user_id: props.user.id,
        posts_id: post.id,
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let _sendComment = () => {
    let _data = {
      user_id: props.user.id,
      posts_id: post.id,
      comment: comment,
    };
    setComment("")

    apis.social.comment(
      _data,
      (res) => {
        setShowComment(false)
        let _comments = comments;
        _comments.push(res);
        setComments(_comments);
        setShowComment(true)
        
      },
      (err) => {
        console.log(err.response);
      }
    );
  };

  let _CommentBox = ({ title, comment,avatar }) => (
    <View
      style={{
        padding: 10,
        borderBottomColor: "#7e7e7e",
        borderBottomWidth: 0.5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Image
          source={{uri:env.server + avatar}}
          style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
        />
        <Text style={{ marginHorizontal: 5 }} category="s1">
          {title}
        </Text>
      </View>
      <View style={{ padding: 5 }}>
        <Text>{comment}</Text>
      </View>
    </View>
  );

  return (
    <PanGestureHandler onHandlerStateChange={_changeVideo}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Layout style={styles.container}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#03254c",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                zIndex: 101,
              }}
            >
              <Spinner status="basic" />
            </View>
            {post !== null && (
              <Video
                source={{
                  uri: env.server + "api/main/stramvideo/" + post.video,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: "100%", height: "100%", zIndex: 102 }}
              />
            )}
          </View>
          {/* Content */}
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              {post !== null && (
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                    paddingTop: 20,
                  }}
                >
                  Following | For You
                </Text>
              )}
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 2, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "600",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}
                >
                  {post && post.user.name}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "600",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}
                >
                  {post && post.post}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "900",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}
                >
                  #{post && post.tags}
                </Text>
              </View>
              {post && (
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ padding: 10 }}>
                    <Image
                      source={{ uri: env.server + post.user.avatar }}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      _likeController();
                    }}
                  >
                    <View style={{ padding: 10 }}>
                      <Icon
                        name="heart"
                        style={{ width: 50, height: 50 }}
                        fill={like ? "pink" : "white"}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        {likesCount} Like
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setShowComment(true);
                    }}
                    style={{ padding: 10 }}
                  >
                    <Icon
                      name="message-circle"
                      style={{ width: 50, height: 50 }}
                      fill="white"
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {comments.length}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          {showComment && (
            <View
              style={{
                width: "100%",
                position: "absolute",
                left: 0,
                bottom: 0,
              }}
            >
              <ContentCard>
                <Pressable
                  onPress={() => {
                    setShowComment(false);
                  }}
                  style={{
                    position: "absolute",
                    right: 5,
                    top: 5,
                    zIndex: 103,
                  }}
                >
                  <Icon
                    name="close-circle-outline"
                    style={{ width: 30, height: 30 }}
                    fill="black"
                  />
                </Pressable>
                <Text category="h3">Comments</Text>
                <View style={{ height: 300 }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ maxWidth: 300 }}
                  >
                    {comments.map((trg, index) => (
                      <_CommentBox
                        title={trg.user.name}
                        comment={trg.comment}
                        key={index}
                        avatar={trg.user.avatar}
                      />
                    ))}
                  </ScrollView>
                </View>

                <View
                  style={{
                    padding: 5,
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Input
                      placeholder={"comment"}
                      value={comment}
                      onChangeText={(nextVal) => setComment(nextVal)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        _sendComment();
                      }}
                      style={{
                        padding: 10,
                        marginHorizontal: 2,
                        backgroundColor: "#1167b1",
                        borderRadius: 3,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Send
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ContentCard>
            </View>
          )}
        </Layout>
      </KeyboardAvoidingView>
    </PanGestureHandler>
  );
};

const mapStateToProps = (state) => {
  return {
    social: state.social,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
