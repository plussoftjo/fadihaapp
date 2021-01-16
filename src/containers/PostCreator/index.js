import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  Input,
  Button,
} from "@ui-kitten/components";
import { connect } from "react-redux";

import {Loader} from '../../components'

import { Video } from "expo-av";
import { env } from "../../constants";
let PostCreator = (props) => {
  let [data, setData] = React.useState({
    post: "",
    tags: "",
  });
  let [isLoad,setIsLoad] = React.useState(false)

  let _store = () => {
      setIsLoad(true)
    let _data = new FormData();
    let uriArray = props.social.createPost.video.split(".");
    let fileType = uriArray[uriArray.length - 1];
    console.log(fileType)
    let name = Math.floor(Math.random() * 1000000000000);
    _data.append("video", {
      uri: props.social.createPost.video,
      name: `${name}.${fileType}`,
      type: `video/${fileType}`,
    });
    _data.append("post", data.post);
    _data.append("tags", data.tags);
    _data.append("user_id", props.user.id);
    let options = {
      method: "POST",
      body: _data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    fetch(env.server + "api/post/store", options)
      .then((response) => response.json())
      .then(async (json) => {
        console.log(json);
        setIsLoad(false)
        if(json.message == 'UploadSuccess') {
          alert("Success Upload Video")
          props.navigation.navigate('Home');
        }else {
          alert("There Are error please complete the field or try again")

        }
        
      })
      .catch((error) => {
        console.error(error);
        setIsLoad(false)
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="Post Create" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 15 }}>
            <Input
              placeholder="Post"
              value={data.post}
              onChangeText={(nextVal) => {
                setData({ ...data, post: nextVal });
              }}
              multiline={true}
              textStyle={{ minHeight: 128 }}
            />
          </View>
          <View style={{ padding: 15 }}>
            <Input
              placeholder="tags"
              value={data.tags}
              onChangeText={(nextVal) => {
                setData({ ...data, tags: nextVal });
              }}
            />
          </View>
          <View style={{ padding: 15 }}>
            <Video
              source={{ uri: props.social.createPost.video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping={false}
              style={{ width: "100%", height: 200 }}
            />
          </View>

          <View style={{ padding: 15, marginTop: 10 }}>
            <Button
              onPress={() => {
                _store();
              }}
            >
              Save Post
            </Button>
          </View>
        </ScrollView>
        {isLoad &&
            <Loader />
        }
      </Layout>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);
