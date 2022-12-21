import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  Image
} from 'react-native';
  import Icon from 'react-native-vector-icons/Ionicons';
  import PreparerParcours from './PreparerParcours'
  import VoirParcours from './VoirParcours'
  import AnticiperParcours from './AnticiperParcours'
  import PrevoirParcours from './PrevoirParcours'
  import AccueilParcours from './AccueilParcours'
  import ClotureFormation from './ClotureFormation'
  import { Router, Scene, Actions, ActionConst, Tabs } from 'react-native-router-flux';
// Simple component to render something in place of icon
const TabIcon = ({ tintColor }) => {
  return (
    <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
  );
}
const TabIcon4 = ({ tintColor }) => {
  return (
    <Icon style={[{color: tintColor}]} size={36} name={'ios-car'} />
  );
}
const TabIcon1 = ({ tintColor }) => {
  return (
    <Icon style={[{color: tintColor}]} size={36} name={'ios-person'} />
  );
}
const TabIcon2 = ({ tintColor }) => {
  return (
    <Icon style={[{color: tintColor}]} size={36} name={'ios-walk'} />
  );
}
const TabIcon3 = ({ tintColor }) => {
  return (
    <Icon style={[{color: tintColor}]} size={36} name={'ios-eye'}/>
  );
}

  class HomeParcours extends React.Component{
    onBackFunction()
{
  console.log("backkkkkkkkkk")
  Actions.pop()
}
     render(){
     return(
       <View  style={styles.container} sceneStyle={{ fontSize:36}}>
        <Router headerMode="none">
      <Scene key="root">
      <Scene key="accueilP" title="Home">
              <Scene
                key="accueilP"
                component={AccueilParcours}
                title="Home"
              />
               <Scene 
                key="clotureF" 
                component={ClotureFormation} 
                title="Cloturer"
               />
          </Scene>
        <Tabs
        key="tabbar"
        // tabs={true}
        tabBarStyle={{ backgroundColor: '#FFFFFF'}}
        wrap={false}
       
        
         >
          
          <Scene key="prepareParcours" icon={TabIcon4} title="Preparer" 
          //  onEnter={()=> {
          //   Actions.preparerParcours({type: ActionConst.REFRESH});
          // }}
          >
            <Scene
              key="preparerParcours"
              component={PreparerParcours}
              title="Preparer"

              // onExit={() => console.log(this.props)}
              // onBack={ () =>this.onBackFunction()}
            />
        </Scene>
        <Scene key="voirParcours" icon={TabIcon3} title="Voir" >
            <Scene
              key="voirParcours"
              component={VoirParcours}
              // onExit={() => console.log(this.props)}
              title="See"
            
              
            />
        </Scene>
        <Scene key="prevoirParcours" icon={TabIcon1} title="Prevoir" >
            <Scene
              key="prevoirParcours"
              component={PrevoirParcours}
              title="Prevoir"
              
            />
        </Scene>
        <Scene key="anticiperParcours" icon={TabIcon2} title="Anticiper" >
            <Scene
              key="anticiperParcours"
              component={AnticiperParcours}
              title="Anticiper"
            />
        </Scene>
      </Tabs>
      </Scene>
    </Router>
       </View>
      
    
     )}
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });
  export default HomeParcours
  