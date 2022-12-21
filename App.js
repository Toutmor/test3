import React from 'react';
import { YellowBox } from 'react-native';
//import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persist from './src/config/store'
import Main from './src/Main'
import Routes from './src/components/Routes'
import { Provider } from 'react-redux';
import { BackHandler } from 'react-native';

//import { Provider } from 'react-native-paper/lib/typescript/src/core/settings';
import SSHClient from 'react-native-sshclient';
import { enableScreens } from 'react-native-screens';
import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://b9bd95454b4a4d7f82789564b70beb0a@o1155419.ingest.sentry.io/6235886', 
  tracesSampleRate: 1.0,
  enableAutoPerformanceTracking:true,
  enableNativeCrashHandling:true,
  enableAutoSessionTracking:true,
  sessionTrackingIntervalMillis:10000,
});
enableScreens();

// Sentry.init({
//   dsn: "https://b9bd95454b4a4d7f82789564b70beb0a@o1155419.ingest.sentry.io/6235886",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// })
// //const persistStore = persist()
const persistStore = persist()

class App extends React.Component {
  UNSAFE_componentWillMount(){
    console.log("rrrrr");
    try {
      console.log("cf");
          
      SSHClient.setup("pi","10.3.141.1",22);
      SSHClient.usePrivateKey(false);
      SSHClient.setPassword("raspberry");
      SSHClient.connect().then(
          (result)=>{
              console.log(result);
      //for us : stream_simulator.py
      //for tushar capture_video.py
          SSHClient.execute("python3 enable_hotspot.py").then(
              (result)=>{
                  console.log(result);
                  // alert("can_close result"+result);
              },
              (error)=>{
                Sentry.captureException(error);
                console.log(error);
                  // alert("can_close execution: "+error);
              }
              );
          },
          (error)=>{
            Sentry.captureException(error);
            console.log("cf"+error);
          }
        );
     

  } catch (error) {
  
    console.log("cf"+error);
  }
  }
 
  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    BackHandler.addEventListener('backPress', () => {return true})
    
  
    return (
      <Provider store={persistStore.store}>
          <PersistGate loading={null} persistor={persistStore.persistor}>
           <Main/> 
          </PersistGate>
      </Provider>     
       
     
    ); 
  }
}

export default Sentry.wrap(App);