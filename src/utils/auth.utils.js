import {Alert} from 'react-native';

export class ErrorUtils {
    constructor(error, title = "") {
        this.errorTitle = title;
        // this.errorText = "Something went wrong";
        console.log(typeof error);
        if (typeof error === "string") {
          this.errorText = error;
        } else {
            if (error.message) {
              this.errorText = error.message
          } else if (error.responseBody && error.responseBody.message) {
              this.errorText = error.responseBody.message;
          } else if (error.responseBody.status) {
              this.errorText = error.responseBody.status;
          }
        }
       
    }

    showAlert() {
        Alert.alert(
          this.errorTitle,
          this.errorText,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );
    }
}