import React from 'react';
import { View,ScrollView,Image,TouchableOpacity } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Global Components
import {GradientSpace,ContentCard} from '../../../components'
import {apis} from '../../../services'

import {UserActions} from '../../../stores'
// Local Components
import {HeaderContent} from './components'

let CoinsLogs = (props) => {
    
    let {coinsLogs,posts,user} = props.user
    let {navigation,locale} = props;

    let _delete = (id) => {
        apis.social.removePost({id:id,user_id:user.id},(res) => {
            alert('Delete Success')
            props.setPosts(res)
        },err => {
            console.log(err.response)
        })
    }
     return(
         <Layout style={{flex:1}}>
            <GradientSpace />
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
                <HeaderContent rtl={locale.rtl} navigation={navigation} title={'My Videos'} />
                <View style={{paddingTop:15}}></View>
                <ContentCard >
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                {posts.map((trg,index) => (
                    <View key={index} style={{padding:10,borderRadius:3,borderColor:'#7e7e7e',borderWidth:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                        <Text>{trg.id} - {trg.post}</Text>
                        <TouchableOpacity onPress={() => {_delete(trg.id)}}>
                            <Text category="s1" style={{color:'red'}}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
                </ContentCard>
            </ScrollView>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user,
         locale:state.settings.locale
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setPosts:item => dispatch(UserActions.setPosts(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsLogs);