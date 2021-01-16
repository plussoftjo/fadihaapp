import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

// Constants
import { StorageToken } from "../../constants";

// Services
import { apis,LocaleLoader } from "../../services";

// Stores
import { connect } from "react-redux";
import { UserActions, PrizesActions,SocialActions } from "../../stores";

let Loading = (props) => {
  let {
    navigation,
    setUser,
    setPosts,
    setExplorPosts
  } = props;
  const isFocused = useIsFocused();
  /**
   *
   * @checker {Checker is about check the things inside our app}
   */

  let InstallAssets = (user_id) => {
    apis.main.index({user_id:user_id},(res) => {
      setPosts(res.myPost)
      setExplorPosts(res.explorPosts)
      navigation.navigate("MainNavigation")
    },err => {
      console.log(err)
    })
  };

  let checker = async () => {

    // Check if user login or not
    let _userToken = await AsyncStorage.getItem(StorageToken.userToken);
    if (!_userToken) {
      // If Not Auth Navigation to auth
      navigation.navigate("Auth");
      return;
    }

    await LocaleLoader();

    // If Auth @setUser in the stores
    let _token = "Bearer " + _userToken;
    apis.user.auth(
      _token,
      (res) => {
        setUser(res);
        InstallAssets(res.id);
      },
      (err) => {
        navigation.navigate("Auth");
      }
    );
  };

  // UseEffect
  useEffect(() => {
    // Checker Call
    checker();
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/loading.png")}
    >
      <Image
        source={require("../../assets/logo/logo.png")}
        style={styles.imageCard}
        resizeMode="contain"
      />
      <View style={styles.pt30}>
        <Spinner status="basic" />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setCoinsLogs: (item) => dispatch(UserActions.setCoinsLogs(item)),
    setTodayCoins: (item) => dispatch(UserActions.setTodayCoins(item)),
    setPosts: (item) => dispatch(UserActions.setPosts(item)),
    setCounts: (item) => dispatch(UserActions.setCounts(item)),
    setSocialTasks: (item) => dispatch(UserActions.setSocialTasks(item)),
    setPrizesCategories: (item) => dispatch(PrizesActions.setPrizesCategories(item)),
    setOrders: (item) => dispatch(UserActions.setOrders(item)),
    setExplorPosts:(item) => dispatch(SocialActions.setExplorPosts(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
