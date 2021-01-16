import React, { useState, useEffect } from 'react';
import { View,Pressable } from 'react-native';
import { Layout,Text,Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';

import {SocialActions} from '../../stores'

let Create = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let [isRecord,setIsRecord] = useState(false)
    let camera = React.useRef()
    let _record = async() => {
      if(!isRecord) {
        setIsRecord(true)
        let result = await camera.recordAsync({
          quality:Camera.Constants.VideoQuality['480p']
        });
        let _data = {
          post:"",
          tags:"",
          video:result.uri
        }
        props.setCreatePost(_data)
        props.navigation.navigate("PostCreator")
      }else {
        setIsRecord(false)
        camera.stopRecording()
      }
    }

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    
     return(
         <Layout style={{flex:1,}}>
            <Camera style={{flex:1}} ref={(r) => {
            camera = r
            }} type={type}>
              <View style={{flexDirection:'column',flex:1}}>
                    <View style={{flex:1,paddingVertical:15,paddingHorizontal:5}}>
                        <Icon name="close-circle-outline" style={{width:50,height:50}} fill="white"  />
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end',paddingVertical:10}}>
                        <View style={{flexDirection:'row',flex:1,alignItems:'flex-end',justifyContent:'space-between'}}>
                            <Icon name="folder" style={{width:50,height:50}} fill="white" />
                            <Pressable 
                              onPress={() => {_record()}}
                            >
                            <Icon name="video" style={{width:50,height:50}} fill={isRecord ? 'red':'white'} />

                            </Pressable>
                            <Icon name="flip" style={{width:50,height:50}} fill="white" />
                        </View>
                    </View>
                </View>
            </Camera>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setCreatePost:item => dispatch(SocialActions.setCreatePost(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);