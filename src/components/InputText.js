import PropTypes from "prop-types";
import React from "react";
import {TextInput, Text, View, StyleSheet} from "react-native";

const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => {},
    onSubmitEditing: () => {},
    onChangeText: () => {},
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};

const styles = StyleSheet.create({
  inputBox: {
    width:500,
    height: 60,
    backgroundColor:'rgba(255, 255,255,0.2)',
    //borderRadius: 25,
    paddingHorizontal:16,
    borderRadius: 25,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 15,
  }

});

class InputText extends React.Component {

    state = {
        value: ""
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    onChangeText = (value) => {
        this.setState({
            value
        }, () => {
            this.props.onChangeText(value);
        })
    }

    render() {
        const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props
        return (
            <View>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={placeholder}
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    selectionColor="#ffffff"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="next"
                    value={this.state.value}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={this.onChangeText} 
                    
                
                    />
            </View>
        );
    }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;