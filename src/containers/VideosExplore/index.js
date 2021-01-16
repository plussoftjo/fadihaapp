import React from 'react';
import { View,ScrollView,Image } from 'react-native';
import { Layout,Text,TopNavigation,Input } from '@ui-kitten/components';
import { connect } from 'react-redux';


let VideosExplore = () => {
    let DATA = [
        'https://cdn.theatlantic.com/thumbor/y7d9pT2dV2HLE6mhTe-srhfoxnQ=/11x28:1130x657/720x405/filters:format(png)/media/img/mt/2015/12/Screen_Shot_2015_12_10_at_4.00.43_PM/original.png',
        'https://searchengineland.com/figz/wp-content/seloads/2016/06/Screen-Shot-2016-06-09-at-7.20.18-AM-800x425.png',
        'https://searchengineland.com/figz/wp-content/seloads/2016/06/Screen-Shot-2016-06-09-at-7.23.43-AM.png',
        'https://imagez.tmz.com/image/3a/4by3/2020/09/27/3aa494039a624ff38f2fad2165d563a8_md.jpg',
        'https://southernboating.com/wp-content/uploads/2019/06/77362451_RT.jpg',
        'https://www.aljazeera.com/wp-content/uploads/2019/07/b61611e5f00f4a9396fbcd6abee2180d_18.jpeg?resize=770%2C513'
    ]

    let VideoCard = ({image}) => (
        <View style={{margin:5,borderRadius:5,borderColor:'#7e7e7e',borderWidth:1}}>
            <Image source={{uri:image}} style={{width:175,height:175,borderRadius:5}} resizeMode="cover" />
        </View>
    )
     return(
         <Layout style={{flex:1}}>
            <TopNavigation title="Explore"></TopNavigation>
            <Input placeholder="Search" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                {DATA.map((trg,index) => (
                    <VideoCard key={index} image={trg} />
                ))}
                </View>
            </ScrollView>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         social:state.social
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosExplore);