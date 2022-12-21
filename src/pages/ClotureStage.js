import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, ListView, TouchableHighlight } from 'react-native';
import { Image } from 'react-native';
import { FlatList } from 'react-native';

import { Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-native';
import { BackHandler } from 'react-native';

import SignatureCapture from 'react-native-signature-capture';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import Mailer from 'react-native-mail';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from 'axios';
import RNFS from 'react-native-fs'
import { createNewStudent } from '../actions/auth.actions';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';
import * as Sentry from '@sentry/react-native';

class ClotureStage extends Component {
    constructor (props){
        super(props)
 
        this.state={
           liste: [],
           refresh:false,
           sign : [],
           base64:[],
           fileName: [],
           signD1 : false,
           index : 0,
           heureStage :"",
           showC2 : false,
           showC1 : false,
           showC3 : false,
           signD:false,
           comment :"",
           trainer_id : "",
            trainer_first_name : "",
            trainer_last_name : "",
            signtrainer:"",
            stageName :"",
            stage:"",
            spinner:false,
            spinners:false
        }
        // this.getAll = this.getAll.bind(this) 
        // this.getAll()  
        
        this.getInfoTrainer() 
    }
    reload(){
        try {
            this.state.liste.splice(0,this.state.liste.length)
            
           setTimeout(() => {
            this.getAll()
            
   
           }, 100); 
           setTimeout(() => {
            this.refresh() 
           
           }, 120);
          
          
           
        } catch (error) {
            console.log(error);
            Sentry.captureException(error);
        }
        
    }
    async refresh(){
        this.setState({ 
            refresh: true
        })
        
    }
    _onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log('dragged');
        };
    saveSigntr= () => {
        this.refs['sign'].saveImage();
        };
    
    resetSigntr = () => {
        this.refs['sign'].resetImage();
        };
    _onSaveEvent = result => {
        const base64String = `data:image/png;base64,${result.encoded}`;
        this.setState({signtrainer : base64String , signD:false})
        //console.log(result.encoded);
        };
    
      
    onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log('dragged');
        };
    saveSign = (id) => {
        console.log(id);
        this.refs['sign'+id].saveImage();
        };
    
    resetSign = (id) => {
       
        this.refs['sign'+id].resetImage();
    };
    onSaveEvent = result => {
        const base64String = `data:image/png;base64,${result.encoded}`;
        let obj ={
            index : this.state.index,
            sign : base64String
        }
        this.state.sign.push(obj)
        
        //console.log(this.state.sign);
        this.setState({signD1:false})
        //console.log(result.encoded);
    };
    async getInfoTrainer (){
        let str_trId= await AsyncStorage.getItem('@trainer_id')
        let str_trfname=await AsyncStorage.getItem('@trainer_first_name') 
        let str_trlname = await AsyncStorage.getItem('@trainer_last_name')
        this.setState({
        trainer_id : str_trId,
        trainer_first_name : str_trfname,
        trainer_last_name : str_trlname,
      })
       console.log(str_trId);
      }
    async componentDidMount(){
        BackHandler.addEventListener('backPress', () => {return true});
        
        let heureStage = await AsyncStorage.getItem('@heureStage')
        // let data_formation = await AsyncStorage.getItem('data_formation')  
        
        // let data_formation_json = JSON.parse(data_formation)
        
        let stage=""
        let stageName=""
        if (this.props.stage !== undefined) {
          stage= this.props.stage
        } else {
          stage = await AsyncStorage.getItem("stage")
          console.log(stage);
        }
        
        if (this.props.stageName !== undefined) {
          stageName= this.props.stageName
        } else {
          stageName= await AsyncStorage.getItem("stageName")
          
        }
        console.log(stageName+"dddr");
        this.setState({heureStage : heureStage, stage:stage, stageName:stageName}) 
        setTimeout(() => {
            console.log(this.state.stageName); 
        }, 1000);
        
    } 
    async getAll(){
        
        try {
            let indextotal = await AsyncStorage.getItem('totalStudent')
            console.log("d"+indextotal);
            if (parseInt(indextotal) === 1) {
                console.log("rrr");
               const first_name = await AsyncStorage.getItem('@student_first_name'+indextotal)
                const last_name = await AsyncStorage.getItem('@student_last_name'+indextotal)
                const id = await AsyncStorage.getItem('@student_id'+indextotal)
                const email = await AsyncStorage.getItem('@student_email'+indextotal)
                let obj  ={
                    "name" : first_name +" "+last_name,
                    "id" : id,
                    "email":email
                 }
                this.state.liste.push(obj) 
            }else{
                console.log('yes!! ')
            for (let index = 1; index < parseInt (indextotal)+1; index++) {
                const first_name = await AsyncStorage.getItem('@student_first_name'+index.toString())
                const last_name = await AsyncStorage.getItem('@student_last_name'+index.toString())
                const id = await AsyncStorage.getItem('@student_id'+index.toString())
                const email = await AsyncStorage.getItem('@student_email'+index.toString())
                let obj  ={
                    "name" : first_name +" "+last_name,
                    "id" : id,
                    "email":email
                 }
                this.state.liste.push(obj) 
                
            }
            this.removeDuplicate()
        }
       
        
        
            console.log(this.state.liste);
           console.log(this.state.liste.length+'rhk ')   
            
        } catch (error) {
            console.log(error)
        }
    }
    removeDuplicate(){
        console.log("++++++++");
        //Remove duplicate from Array list
        const newArrayList = [];
        this.state.liste.forEach(obj => {
          if (!newArrayList.some(o => o.id === obj.id)) {
            newArrayList.push({...obj});
          }
        });
        console.log(newArrayList);
     
        this.setState({liste: newArrayList});  
      }
 
    async componentWillMount(){
        this.reload()
        // let studentEvalues = await AsyncStorage.getItem('pr_student_evalue')
        
        // console.log(studentEvalues);
        // this.setState({studentEvalue : studentEvalues})
        console.log(this.props.stage+"dd");
        console.log(this.props.stageName+"dd");
    }
   
   
    generateHTML= (comment,sign1,sign2,student_name,trainer_first_name,trainer_last_name,heureDebut,stage) =>


	`
	<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
	<div class="col-md-12">
         <div class="row">
			<div class="col-6" style="position:relative;width:200px;height:200px;top:-80px">
					<img src="https://api.cleandata.link/uploads/logo/Sanstitre9.png" alt="Beltoise-Logo" 
								style="position: relative;
								width: 100%;
								height: 100%;
								object-fit:contain">
			</div>
		

			<div class="col-3" style="position:relative;left:210px;">
                               <h6>Adresse</h6>
				<p style="font-size: 10px;">
				BELTOISE EVOLUTION<br>
				Avenue des Frères Lumière<br>
				ZA de Trappes-Elancourt<br>
				78190 Trappes</p> 
			</div>
                        <div class="col-3" style="position:relative;left:190px;">
                               <h6>Contact</h6>
				<p style="font-size: 10px;">
					Email : contact@beltoise-evolution.fr <br>        
                    Tel : 01 30 51 23 23<br> <br>
				</p>  
			</div>
		</div>
	

		<div class="row">
			<div class="col-md-12" style="position:relative;text-align:center;">
				<h1 >RAPPORT DE PRÉSENCE</h1>
			</div>
		</div>
		<br>
		<br>
		<div class="row">
			<div class="col-md-12" style="position:relative;text-align:center;">
				<p style="font-size: 18px;">
					Attestation de présence de ${student_name}<br><br>
					au stage ${stage} <br><br>
					réalisé avec le formateur ${trainer_first_name} ${trainer_last_name}<br><br><br>
					Le  ${heureDebut}
				</p> 
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-md-12">
				<p style="font-size: 14px;">
					${comment}
				</p>  
			</div>
		</div>
		<br>
		<br>	
		<div class="row">
			<div style ="width: 800px;height: auto;display: block;align-items: center;">
				<div style="position: relative;float: left; left: 1px;">
					<span>SIGNATURE FORMATEUR </span>
					<br>
					<img src="${sign1}" style="width:150px;height:100px;"/>
				</div>
				<div style="position: relative;float: right; right: 10px !important;">
					<span>SIGNATURE STAGIAIRE </span>
					<br>
					<img src="${sign2}" style="width:150px;height:100px;"/>
				</div>
			</div>
		</div>
		


	</div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" integrity="sha384-eMNCOe7tC1doHpGoWe/6oMVemdAVTMs2xqW4mwXrXsW0L84Iytr2wi5v2QjrP/xp" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.min.js" integrity="sha384-cn7l7gDp0eyniUwwAZgrzD06kc/tftFf19TOAs2zVinnD/C7E91j9yyk5//jjpt/" crossorigin="anonymous"></script>
    -->
  </body>
</html>
`
 

	//créer pdf
	async createPDF(index) {
		try {
			const sign1 = this.state.signtrainer
			const sign2 = this.afficheSignB(index)
			const comment = this.state.comment
			const student_name = this.state.liste[index].name
		
			const trainer_first_name = this.state.trainer_first_name
			const trainer_last_name = this.state.trainer_last_name
			const heureDebut = this.state.heureStage
			console.log(sign2);
			console.log(heureDebut);
			console.log(sign1)
			
	
			const html = this.generateHTML(comment,sign1,sign2,student_name,trainer_first_name,trainer_last_name,heureDebut,this.state.stageName);
			//console.log(html);
			let options = {
			//Content to print
			html: html,
			
			//File Name
			
			fileName: 'rapport_'+this.state.liste[index].id+"_Stage_Beltoise_Conduire_Juste",
			//File directory 
			directory: 'docs',
			base64 : true,
			width:612,
			height:792,
		
			};
			try {
				let file = await RNHTMLtoPDF.convert(options)
		console.log(file.filePath);
        let fileinf ={
            id_student: this.state.liste[index].id,
            fileName : options.fileName,
            filePath : file.filePath
        }
            let obj = {
                id_student: this.state.liste[index].id,
                signature_trainer : this.state.signtrainer,
                signature_student : this.afficheSignB(index),
                rapport : 'data:application/pdf;base64,'+file.base64
            }
            this.state.base64.push(obj)
            this.state.fileName.push(fileinf)
			this.setState({filePath:file.filePath, pdf_base64:'data:application/pdf;base64,'+file.base64});
			//console.log(this.state.pdf_base64);
			} catch (error) {
				console.log(error); 
                Sentry.captureException(error);
			}
			
		} 
			catch (error) {
			console.log(error);
            Sentry.captureException(error);
			
			}
		}
      

        sendFile = () => {
            const {signtrainer} = this.state;
            if( signtrainer === "" ){
              Alert.alert(
                "WARNING",
                "Signature Formateur obligatoire",
                [
                  {
                    text: "OK", 
                    onPress: () => {
                        this.setState({
                            comment:"",
                            signtrainer:""
                        }) 
                        console.log("OK Pressed")
                 }
                  }
                ]
              )
            }else{
                try {
                    this.createPDF(this.state.index)
                    this.setState({spinner : true})
                    setTimeout(() => {
                        this.setState({spinner : false})
                        this.handleEmail()  
    
                    }, 4000);
                    setTimeout(() => {
                        this.setState({
                            comment:"",
                            signtrainer:""
                        })
                    }, 6000);
                     
                } catch (error) {
                    Sentry.captureException(error); 
                }
                
               
            } 
        }

        //envoyer email
	handleEmail = () => {
        try {
            let path = this.afficheRapport(this.state.index)
            console.log(path);
            Mailer.mail({
                subject: 'Rapport de présence',
                recipients: [this.state.liste[this.state.index].email],
                ccRecipients: ['service.conseil@beltoise-evolution.fr'],
                // bccRecipients: ['dominique.clarac@cleandata-innov.com'],
                body: '<b>Email sent from Beltoise App powered by CleanData</b>',
                customChooserTitle: "This is my new title", // Android only (defaults to "Send Mail")
                isHTML: true,
                attachments: [{
                path: path,  // The absolute path of the file from which to read data.
                type: 'pdf',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                // mimeType - use only if you want to use custom type
                name: 'rapport',   // Optional: Custom filename for attachment
                }]
                }, (error, event) => {
                
                Alert.alert(
                error,
                event,
                [
                    {text: 'Ok', onPress: () => console.log('OK: Email Error Response'+event)},
                    {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                { cancelable: true }
                )
            });
            setTimeout(() => {
                this.setState({showC3:false})
            }, 2000); 
        } catch (error) {
            Sentry.captureException(error);
        }
        
        
        }
    
    validateC = () => {
            const {comment} = this.state;
            if(comment === ""){
              Alert.alert(
                "WARNING",
                "Veuillez rédiger un commentaire",
                [
                  {
                    text: "OK", 
                    onPress: () => console.log("OK Pressed") 
                  }
                ]
              )
            }else{
                this.setState({showC2:false})
                this.setState({showC1:true })
            }
            }

    renderSeparator = () => {
		return (
		<View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: '#00B0F0',
			// marginLeft: "9%"
			}}
		/> 
		)
	} 
    afficheSignB(ind){
        let url = ""
        let base64 = this.state.sign
       
        for (let index = 0; index < base64.length; index++) {
            const element = base64[index]
            console.log("ff"+element.index)
           
            if (element.index === ind) {
                url = element.sign
                break;
            }else{
                url = ""
            }
            
        }
        return url;
      
           
    }
    
    afficheSign(ind){
        let url = ""
        let base64 = this.state.base64
        let liste = this.state.liste
        for (let index = 0; index < base64.length; index++) {
            const element = base64[index]
           
            if (element.id_student === liste[ind].id) {
                url = element.signature_student
                break;
            }else{
                url = ""
            }
            
        }
        return url;
      
           
    }
    afficheRapport(ind){
        let url = ""
        let base64 = this.state.fileName
        let liste = this.state.liste
        for (let index = 0; index < base64.length; index++) {
            const element = base64[index]
            
            if (element.id_student === liste[ind].id) {
                url = element.filePath
                break;
            }else{
                url = ""
            }
            
        }
        return url;
    }
    async sendDataToBD(){
        try {
            this.setState({spinners : true})
            let data_formation = await AsyncStorage.getItem('data_formation')  
            if (data_formation !== null) {
                let data_formation_json = JSON.parse(data_formation)
                console.log(data_formation);
                let form_data = new FormData()
                for (let index = 0; index < data_formation_json.length; index++) {
                    const element = data_formation_json[index].data[0].video;
                    // console.log(element);
                    if (element !== undefined) {
                        for (let i = 0; i < element.length; i++) {
                            const file = element[i]
                            console.log(file);
                            form_data.append(
                                'files',{
                                uri:'file://'+RNFS.DownloadDirectoryPath+'/'+file.name,
                                type:'video/mp4',
                                name:file.name
                            })
                        }
                       
                    }
                }
               
                let obj = {
                            id_trainer: parseInt(this.state.trainer_id,10),
                            stage:this.state.stage,
                            formation:JSON.parse(data_formation),
                            base64 : this.state.base64
                        }
                        //console.log(obj);
                        
                        form_data.append("json",JSON.stringify(obj))
                    
                        
                    
                        console.log('starting');
                        
                        axios({
                            url    : 'https://api.cleandata.link/api/formation',
                            method : 'POST',
                            data   : form_data,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        .then((response)=> {
                            console.log("response : ", response.data.status);
                            if (response.data.status === "success") {
                                this.setState({spinners : false})
                                console.log("yessss");
                                this.props.dispatch(createNewStudent(undefined))
                                    Actions.home()
                                AsyncStorage.multiRemove([
                                    'data_formation',
                                    '@heureStage',
                                    'totalStudent',
                                    'pr_totalStudent',
                                    'nb_totalStudent',
                                    'gcam_totalStudent',
                                    'isStageCompleted',
                                    'r_totalStudent',
                                    'f_totalStudent',
                                    'su_totalStudent' 
            
                                ],(error)=> {
                                    console.log("error : "+ error);
                                    Sentry.captureException(error);
                                    
                                })
                                setTimeout(() => {
                                    Alert.alert(
                                        "STAGE TERMINE!",
                                        "Vous pouvez commencer un nouveau stage ou vous déconnecter.",
                                        [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                
                                               console.log("fff");
                                            }
                                        }]
                                    ) 
                                       
                                    
                                }, 1000);
                                 
                            }
                           else{
                            console.log("no");
                            this.setState({spinners : false})
                            Sentry.captureException(response.data.message);
                            Alert.alert(
                                response.data.message,
                                "veuillez SVP de nouveau cliquer sur CLOTURER",
                                [
                                {
                                    text: "OK",
                                    onPress: () => {
                        
                                       console.log("fff");
                                    }
                                }]
                            ) 
                               
                            }
                           
                            
                            
                        })
                        .catch((error)=> {
                            this.setState({spinners : false})
                            console.log("error : ", error);
                            Sentry.captureException(error);
                            Alert.alert(
                                error,
                                "veuillez SVP de nouveau cliquer sur CLOTURER",
                                [
                                {
                                    text: "OK",
                                    onPress: () => {
                        
                                       console.log("fff");
                                    }
                                }]
                            ) 
                               
                            
                        })
            } else {
                this.setState({spinners : false})
                Alert.alert(
                    "Attention!",
                    "pas de données de formation trouvées, vous allez être redirigé vers la page de sélection de stage",
                    [
                    {
                        text: "OK",
                        onPress: () => {
                            
                                this.props.dispatch(createNewStudent(undefined))
                                Actions.home()
                                AsyncStorage.multiRemove([
                                    'data_formation',
                                    '@heureStage',
                                    'totalStudent',
                                    'pr_totalStudent',
                                    'nb_totalStudent',
                                    'gcam_totalStudent',
                                    'isStageCompleted',
                                    'r_totalStudent',
                                    'f_totalStudent',
                                    'su_totalStudent' 
            
                                ],(error)=> {
                                    console.log("error : "+ error);
                                    Sentry.captureException(error);
                                    
                                })
                           
                        }
                    }]
                ) 

               
            }
           
            
        } catch (error) {
            this.setState({spinners : false})
            console.log("error : ", error);
            alert(error)
            Sentry.captureException(error);
        }
       
    }
    afficheIcon(ind){
        let url = ""
        let base64 = this.state.fileName
        let liste = this.state.liste
        if (base64.length != 0) {
            for (let index = 0; index < base64.length; index++) {
                const element = base64[index]
                console.log("ff"+element.id_student)
                console.log("rrr"+liste[ind].id)
                if (element.id_student === liste[ind].id) {
                    url = "check-circle" 
                    break;
                }else{
                    url ="checkbox-blank-circle-outline"
                }
                
            }  
        }
        else{
            url ="checkbox-blank-circle-outline"
        }
        
        return url;
    }
         
    

    renderListe(){
        
        return(
             
            <FlatList
                data={this.state.liste}
                keyExtractor={(item, index) => index}
                extraData={this.state.refresh}
                
                renderItem={({item})=>(
                    
                   
                    
                    <View style={{
                        alignItems:"center",
                        justifyContent:'center',alignContent:"center",flexDirection:"row"}}>
                            <Text style={{color: 'white',fontSize:22,}}>
					            {(this.state.liste.findIndex(it=>it === item))+1}
					        </Text>
                            
                        <TouchableOpacity style={{height:150, 
                            width:300,
                            alignItems:"center",
                            justifyContent:'center'}}
                            onPress = {()=>
                                {   
                                    this.setState({showC2 : true , index :this.state.liste.findIndex(it=>it === item)})
                                }
                            }
                            >
                        
                        <Text style={{color: 'white',fontSize:22,}}>{item.name}</Text>
    
                        </TouchableOpacity>
                        <View  
                            style={{alignItems:"center",justifyContent:'center', 
                            alignContent:"center",flexDirection:"column",marginRight:55}}>

                            <TouchableOpacity style={{backgroundColor:"white",width: 200, height: 100}}>
                                {this.afficheSign(this.state.liste.findIndex(it=>it === item)) !==""? (
                                    <Image resizeMethod={'auto'} resizeMode={'contain'} 
                                    style={{width: 200, height: 80}}
                                    source={{uri :this.afficheSign(this.state.liste.findIndex(it=>it === item))}}
                                    />
                                
                                ):(null)}
                                
                            </TouchableOpacity>
                            {/* <Text style={{color: 'white',fontSize:16,}}>{this.afficheRapport(this.state.liste.findIndex(it=>it === item))}</Text> */}
                        </View>
                        <Icon
                            name = {this.afficheIcon(this.state.liste.findIndex(it=>it === item))}
                            type = "material-community" 
                            color ='#00B0F0'
                            size = {30}
                        	
                        />
                        
                        
                        
                          
                    </View>
                    
                )}
                ItemSeparatorComponent={this.renderSeparator}
            />
            )   
    
   
       
    
  
       
    }
 
render(){
   
 
        return(
            <View style={styles.container}>
               <View style={styles.headerContainer}>
                 <View style={{alignItems:"center",flexDirection:"row"}}>
                 <Image
                         resizeMode ="contain"
                         style={{ width:200, height:260,left:15}}
                         source= {require("../images/Sanstitre9.png")}
                    />
                      {/* <Text style={styles.headerTitle}>PARCOURS ROUTIER</Text> */}
                      </View>
                      {/* <Text style={{color:'#00B0F0',fontSize:16,left:-177, textAlign:'right',fontStyle:"italic",top:45}}>Powered by CleanData</Text> */}
                      
                </View>
                <View style={{top:50,flex:1}}>
                <View style={{flexDirection:"row",alignContent:"center",
            alignItems:'center',
            justifyContent:"center"}}>
                    <Text style={{alignSelf: 'center',color: 'white',fontSize:22,fontWeight:'bold',marginLeft:50 ,marginRight:20}}>CLOTURE STAGE </Text>
                    <Icon
                        name='reload'
                        type="material-community"
                        color='red'
                        size= {30}
                        onPress={() => this.refresh()}	
                    />
                </View>
                <View style={{borderWidth:2,borderColor:'#00B0F0',paddingRight:30,paddingLeft:30,width:'100%',height:600,marginTop:70}}>
               
                 <SafeAreaView
                    style={{width:"100%",height:600}}
                    >
                   
                    {/* <Text style={{color:'#fff',textAlign: 'left', left:25,marginVertical:50}}>STAGIAIRES:</Text> */}
                        {this.renderListe()}
                    
                        <Spinner
                            visible={this.state.spinner}
                            animation={"fade"}
                            overlayColor={"#40606060"}
                            indicatorStyle ={{size: "large"}}
                            textContent={'Création de l'+"'"+"attestation..."}
                            textStyle={styles.spinnerTextStyle}
                            
                        />
                        <Spinner
							visible={this.state.spinners}
							animation={"fade"}
							overlayColor={"#40606060"}
							indicatorStyle={{ size: "large" }}
							textContent={'Sauvegarde des données en cours...'}
							textStyle={styles.spinnerTextStyle}

						/>
                    
                    <Modal animationType="slide"
                    transparent={true} 
                    visible={this.state.signD1} 
                    onRequestClose={(() => this.setState({signD1:false}))}>
                    <View style={{flex:1}}>
                    <View style={styles.modalss}>
                    <View style={styles.signatureContainer}>
                    <SignatureCapture
                            style={styles.signature}
                            ref={"sign"+(this.state.index).toString()}
                            onSaveEvent={this.onSaveEvent}
                            onDragEvent={this.onDragEvent}
                            showNativeButtons={false}
                            showTitleLabel={false}
                            viewMode={'portrait'}
                        />
                    </View>
                        <View style={{flexDirection: 'row' }}>
                            <TouchableOpacity 
                            style={styles.buttonSign}
                            onPress={() => {
                                this.saveSign(this.state.index)
                            }}>
                            <Text style={{color:'#fff',fontSize:20}}>Save</Text>
                            </TouchableOpacity >
                            <TouchableOpacity 
                            style={styles.buttonSign}
                            onPress={() => {
                                this.resetSign(this.state.index)
                            }}>
                            <Text style={{color:'#fff',fontSize:20}}>Reset</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                    
                    </View>
                    </Modal>

            <Modal animationType="slide"
			transparent={true}  visible={this.state.showC2} 
			onRequestClose={(() => this.setState({showC2:false}))}>
			<View style={styles.modals}>
				<Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>COMMENTAIRE</Text>
				<TextInput
				 
				underlineColorAndroid = "transparent"
				placeholder = "Rédiger un commentaire"
				placeholderTextColor = "white"
				multiline={true}
				autoCapitalize = "none"
				onChangeText={(comment) => this.setState({comment})}
				value={this.state.comment}
				style={{  margin: 15,
					height: 300,
					width : 500,
					borderColor: '#00B0F0',
					borderWidth: 1,
				    color: 'white',
				    fontSize:20}}
					/>
				<View style={{flexDirection:'row'}}>
				<TouchableOpacity   
				style={{width:250,height:90,backgroundColor:'black',justifyContent:'center',alignItems:'center',borderColor:'#00B0F0',borderWidth:2,
				borderRadius:5,top:25}}
				onPress={() =>{ 
                    console.log(this.state.index);
                    this.validateC()
                }}>
				<Text style={{color:'#fff',fontSize:20}}>je clôture le stage </Text>
                <Text style={{color:'#fff',fontSize:20}}>pour ce stagiaire </Text>
				</TouchableOpacity>
				</View>
				</View>
			</Modal> 
			<Modal animationType="slide"
			transparent={true} 
			visible={this.state.showC1} 
			onRequestClose={(() => this.setState({showC1:false}))}>
			
			<View style={{
            
            width:600,
            height:700,
            borderRadius: 10,
            justifyContent:"center",
            alignItems: "center",
  
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top:320,
            backgroundColor:"black",
            borderColor:'#00B0F0',
            borderWidth:2,
            
            left:100
          }}>
            
			<View style={{
            
			marginBottom:50
		}}>
			<Text style={ {  fontSize:30,fontWeight: 'bold',color:"white"} }>CLÔTURE STAGE</Text>
			{/*
			<Icon
					name='close'
					color='black'
					size= {30}
					style ={{marginLeft:300}}
					onPress={() => this.setState({showC2:false})}
						
						/> */}
			</View>
			<Text style={ { alignItems:"center",
			justifyContent:"center",
			alignContent:"center", marginBottom:30,marginTop:20,color:"white",fontSize:20} }>
				Voulez-vous éditer un rapport de présence?
			</Text>
			<View style={{justifyContent:"center",
            alignItems: "center",
              flexDirection:'row',
              alignContent:"center",}}>
			<TouchableOpacity
				onPress={ () => 
				{
					
					//this.saveData()
					this.setState({showC1:false})
				
				} }
				style={ { width:250,height:90,marginRight:25, backgroundColor:'black',borderColor:'#00B0F0',
				borderWidth:2,alignItems:"center",
				justifyContent:"center",
				alignContent:"center", borderRadius:5  } }
				
			>
				<Text style={ { textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
				Non, je clôture le stage pour ce stagiaire
				</Text>

			</TouchableOpacity>
			<TouchableOpacity
				onPress={ () => this.setState({showC1:false,showC3:true}) }
				style={ { width:250,height:90,  backgroundColor:'black',alignItems:"center",
				justifyContent:"center",borderColor:'#00B0F0',
				borderWidth:2,
				alignContent:"center",borderRadius:5 } }
				
			>
				<Text style={ {textAlign:"center",fontSize:14,color:'white',fontSize:20} }>
				Oui, j’édite le rapport de présence de ce stagiaire
				</Text>

			</TouchableOpacity>
			</View>
			</View>
			
			</Modal>
                {this.state.liste.length !==0 ?(<Modal animationType="slide"
			transparent={true} 
			visible={this.state.showC3 } 
			onRequestClose={(() => this.setState({showC3:false}))}>
			<View style={styles.modal1}>
			<View style={{flexDirection:"row"}}>
			<Text style={ {  fontSize: 30,fontWeight: 'bold',color:'white',left:15} }>RAPPORT DE PRÉSENCE</Text>
			
			</View>
			<Text style={{ 
				color:'white',fontSize:20} }>
			    Attestation de présence du stagiaire {this.state.liste[this.state.index].name} {"\n"}au stage {this.state.stageName} {"\n"}
				réalisé avec le formateur {this.state.trainer_first_name} {this.state.trainer_last_name}.{"\n"}
				{this.state.heureStage}
			</Text>
			<View style={{flexDirection:"row",top: 20}}>
			
			<View style={{flex:1,flexDirection:"column"}}>
			<TouchableOpacity 
				style={{width:200,height:70,borderWidth:2, marginHorizontal:20,alignItems:"center",alignContent:"center",justifyContent:"center",marginRight:25,backgroundColor:'black',borderColor:'#00B0F0'}}
				onPress={() => this.setState({signD: true})}
			>
				<Text style={{fontSize:16,fontWeight:'500',textAlign:'center',color:'white'}}>Signature formateur</Text>
			</TouchableOpacity>
			<Image 
                resizeMethod={'auto'} resizeMode={'contain'} style={{width: 200, height: 100,left:20,top:10}}
                source={{uri :this.state.signtrainer}}/>
			</View>
			
			<View style={{flex:1,flexDirection:"column", marginLeft:25}}>
			<TouchableOpacity 
				style={{width:200,height:70,borderWidth:2,alignItems:"center",alignContent:"center",justifyContent:"center",marginLeft:65,backgroundColor:'black',borderColor:'#00B0F0' }}
			onPress={() => this.setState({signD1: true})}
			>
			<Text style={{fontSize:16,fontWeight:'500',textAlign:'center',color:'white'}}>Signature Stagiaire</Text>
			</TouchableOpacity>
            {this.afficheSignB(this.state.index) !==""? (
                    <Image resizeMethod={'auto'} resizeMode={'contain'} style={{width: 200, height: 100,left:20,top:10}}
                                    source={{uri :this.afficheSignB(this.state.index)}}
                                    />
                                
                                ):(null)}
			</View>

			</View>
			
			
			<TouchableOpacity
			style={{width:400,height:50,backgroundColor:'#00B0F0' , alignItems:"center",alignContent:"center",justifyContent:"center", margin:50}}
			onPress={ () => 
				{
				
					this.sendFile()
                    
                   
				
        
			} }
			>
				<Text>Envoyer</Text> 
			</TouchableOpacity>
			</View>
			
			
			</Modal>):(null)}
            <Modal animationType="fade"
			transparent={true} 
			visible={this.state.signD} 
			onRequestClose={(() => this.setState({signD:false}))}>
			<View style={{flex:1}}>
			<View style={styles.modalss}>
			<View style={styles.signatureContainer}>
			<SignatureCapture
					style={styles.signature}
					ref="sign"
					onSaveEvent={this._onSaveEvent}
					onDragEvent={this._onDragEvent}
					showNativeButtons={false}
					showTitleLabel={false}
					viewMode={'portrait'}
				/>
			</View>
				<View style={{flexDirection: 'row' }}>
					<TouchableOpacity 
					style={styles.buttonSign}
					onPress={() => {
						this.saveSigntr();
					}}>
					<Text style={{color:'#fff',fontSize:20}}>Save</Text>
					</TouchableOpacity >
					<TouchableOpacity 
					style={styles.buttonSign}
					onPress={() => {
						this.resetSigntr();
					}}>
					<Text style={{color:'#fff',fontSize:20}}>Reset</Text>
					</TouchableOpacity >
				</View>
			</View>
			
			</View>
			</Modal>

			
			
                       
             
            </SafeAreaView>

                        
            </View>
            <View style={{alignContent:"center",
            alignItems:'center',
            justifyContent:"center",marginTop:80}}>
                    <TouchableOpacity 
                            style={styles.buttonV}
                            onPress = {()=> {this.sendDataToBD()}}
                          >
                            <Text style={{color:'#fff',fontSize:20}}>CLOTURER</Text>
                            </TouchableOpacity >
            </View>
                    
            </View>
             
            </View>
        ) 
   // }
    
}


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#191919'
      },
    headerContainer: {
        //top:24
        height: 80, //80
        flexDirection: 'row',
        // flex: 1.0,
        // justifyContect: 'center',
        backgroundColor:'#323232',
    },
    headerTitle: {
      // flex: 1.0,
      marginLeft: 20,
      // marginRight: 8,
    //  right: 300,
      alignSelf: 'center',
      color: 'white',
      fontSize:22,
      top:-10
  }, 
  modalss:{
	flex:1,
	flexDirection:'column',
	margin: 20,
	backgroundColor: "white",
	borderRadius: 20,
	padding: 35,
	alignItems: "center",
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2
	},
    },
    signatureContainer: {
        flex:1,
        // height:'50%',
        width:'100%',
        borderColor: '#00B0F0',
        borderWidth: 5,
        
        },
        signature: {
        flex:1,
        // height:'50%',
        width:'100%',
        
        },
        modals:{
            width:600,
            height:750,
            borderRadius: 10,
            justifyContent:"center",
            alignItems: "center",
    
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top:235,
            backgroundColor:"black",
            borderColor:'#00B0F0',
            borderWidth:2,
            
            left:100
        },
        modal1:{
            width:600,
            height:700,
            borderRadius: 10,
            justifyContent:"center",
            alignItems: "center",
    
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            top:320,
            backgroundColor:"black",
            borderColor:'#00B0F0',
            borderWidth:2,
            
            left:100
        },
        buttonSign: {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width:50,
            backgroundColor: 'black',
            borderColor:'#00B0F0',borderWidth:2,
            margin: 10,
            },
        buttonV:
            {alignContent:"center",
            alignItems:'center',
            justifyContent:"center",width:150,
            height:50,borderColor:'#00B0F0',borderWidth:2,
            borderRadius:5,marginRight:30},
        spinnerTextStyle: {
            color: '#FFF'
        },
 
})

mapStateToProps = (state,props) => ({
	createUser: state.authReducer.createNewStudent
  })
mapDispatchToProps = (dispatch) => ({
	dispatch
})
export default connect(mapStateToProps,mapDispatchToProps)(ClotureStage)