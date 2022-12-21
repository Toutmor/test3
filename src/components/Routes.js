import React from 'react'
import {Router,Scene} from 'react-native-router-flux'
import Accueil from '../pages/GCAM/Accueil'
import HomeP from '../pages/HomeP'
import HomeStage from '../pages/Home'
import LoginGCam from '../pages/GCAM/LoginGCam'
import LoginNodbox from '../pages/nodbox/LoginNodbox'
import AffichageDonnees from '../pages/nodbox/AffichageDonnees'
import ScreenTest from '../pages/ScreenTest'
import Comparaison from '../pages/nodbox/lasuite/comparaison'
import AccueilParcours from '../pages/ParcoursRoutier/AccueilParcours'
import ClotureFormationPR from '../pages/ParcoursRoutier/ClotureFormation'
import LoginParcours from '../pages/ParcoursRoutier/LoginParcours'
import AccueilP from '../pages/ParcoursRoutier/AccueilP'
import ListeStudentPR from '../pages/ParcoursRoutier/ListeStudentPR'
import AccueilGCAM from '../pages/GCAM/AccueilGCam'
import ClotureFormationGcam from '../pages/GCAM/ClotureFormationGcam'
import EvaluationGCAM from '../pages/GCAM/choixEvaluation'
import Login from '../pages/Login'
import ListeStudents from '../pages/GCAM/ListeStudent'
import AccueilNodbox from '../pages/nodbox/AccueilNodbox'
import SelectVariables from '../pages/nodbox/choixVariables'
import HomeNodbox from '../pages/nodbox/nodboxHome'
import EvaluationNodbox from '../pages/nodbox/evaluationNodbox'
import EvaluationPR from '../pages/ParcoursRoutier/evaluationPR'
import ListeStudentNB from '../pages/nodbox/ListeStudentsNb'
import AccueilRenversement from '../pages/renversement/AccueilRenversement'
import AccueilFreino from '../pages/freinographe/AccueilFreino'
import AccueilUrgence from '../pages/situationUrgence/AccueilUrgence'
import AccueilEnCours from '../pages/renversement/AccueilEnCours'
import ClotureR from '../pages/renversement/ClotureR'
import LancerFrein from '../pages/freinographe/LancerFrein'
import LancerUrgence from '../pages/situationUrgence/LancerUrgence'
import ClotureUrgence from '../pages/situationUrgence/ClotureUrgence'
import ClotureFrein from '../pages/freinographe/ClotureFrein'


import RejouerP1 from '../pages/nodbox/lasuite/rjouerC1'
import HistoParcours from '../pages/nodbox/lasuite/histo1'
import LoginStudent from '../pages/LoginStudent'
import ClotureStage from '../pages/ClotureStage'
import ClotureNodbox from '../pages/nodbox/ClotureNodbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListeStudentR from '../pages/renversement/ListeStudentsR'
import ListeStudentF from '../pages/freinographe/ListeStudentFrein'
import ListeStudentSU from '../pages/situationUrgence/ListeStudentSU'

export default class Routes extends React.Component{
	constructor (props){
        super(props)
		this.state ={
			isStageCompleted : false
		}
		
	}
	async componentDidMount(){
		let isStageComplete = await AsyncStorage.getItem('isStageCompleted')
		// setTimeout(() => {
		// 	console.log(isStageCompleted );
		// }, 100000);
		console.log(isStageComplete );
		this.setState({isStageCompleted : isStageComplete !== null})
	}
	
	render() {

		console.log(this.state.isStageCompleted );
		return(
			<Router headerMode="none">
				<Scene>
					<Scene key="root" hideNavBar={true}   initial= {!this.props.isLoggedIn}>
						<Scene key="login" component={Login}/>
					</Scene>
					<Scene key= "app" hideNavBar={true} initial= {this.props.isLoggedIn} >
						<Scene key="home" component={HomeStage} initial= {!this.state.isStageCompleted}/>	
						<Scene key="homP" component={HomeP}  initial= {this.state.isStageCompleted} />
						<Scene key="loginStudent" component={LoginStudent} />
						<Scene key="screenTest" component={ScreenTest}/>
						{/* GCAM */}
						<Scene key="evaluationGCAM" component={EvaluationGCAM}/>
						<Scene key="loginGCam" component={LoginGCam} />
						<Scene key="accueilGCAM" component={AccueilGCAM}  />
						<Scene key="accueil" component={Accueil}/> 
						<Scene key="clotureGCAM" component={ClotureFormationGcam} />
						<Scene key="listeStudentGCAM" component={ListeStudents} />
						{/* NODBOX />*/}
						<Scene key="loginNodbox" component={LoginNodbox}/>
						<Scene key="evaluationNodbox" component={EvaluationNodbox}/>
						<Scene key="homeNodbox" component={HomeNodbox} />
						<Scene key="selectV" component={SelectVariables}/>
						<Scene key="accueilNodbox" component={AccueilNodbox}/>
						<Scene key="listeStudentNB" component={ListeStudentNB} />
						<Scene key="clotureNB" component={ClotureNodbox} />
						<Scene key="affichageDonnees" component={AffichageDonnees}/> 
						<Scene key="comparaison" component={Comparaison} />
						<Scene key="histo" component={HistoParcours} />
						<Scene key="rjouer1" component={RejouerP1} />
						{/*PR />*/}
						<Scene key="loginP" component={LoginParcours}/>
						<Scene key="accueilPR" component={AccueilP}/>
					    <Scene key="accueilP" component={AccueilParcours}/>
						<Scene key="clotureF" component={ClotureFormationPR} />
						<Scene key="listeStudentPR" component={ListeStudentPR} />
						<Scene key="evaluationPR" component={EvaluationPR}/>
					    {/* RENVERSEMENT/>*/}
						<Scene key="listeStudentR" component={ListeStudentR} />
						<Scene key="accueilRenvers" component={AccueilRenversement}/>
						<Scene key="accueilC" component={AccueilEnCours}/>
						<Scene key="clotureRen" component={ClotureR}/>
						{/* FREINOGRAPHE/>*/}
						<Scene key="listeStudentF" component={ListeStudentF} />
						<Scene key="accueilFrein" component={AccueilFreino}/>
						<Scene key="lancerFrein" component={LancerFrein}/>
						<Scene key="clotureFrein" component={ClotureFrein}/>
						{/* SITUATION D'URGENCE/>*/}
						<Scene key="listeStudentSu" component={ListeStudentSU} />
						<Scene key="accueilUrg" component={AccueilUrgence}/>
						<Scene key="lancerUrg" component={LancerUrgence}/>
						<Scene key="clotureUrg" component={ClotureUrgence}/>

						<Scene key="clotureStage" component={ClotureStage} />
					
                    </Scene>
				</Scene>
			</Router>
		
		)
	}
}