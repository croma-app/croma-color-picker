import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Color from 'pigment/full';
import Touchable from 'react-native-platform-touchable';
const colors = [
  '#f50057', '#db0A5b', '#c51162', '#9c27b0', '#673ab7', '#4b77be', '#2196f3', '#03a9f4', '#00bcd4', '#1bbc9b',
  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#f44336', '#e00032'
];
function CromaColorPicker(props) {
  const [primarySelectedColor, setPrimarySelectedColor] = useState("#db0a5b");
  const [selectedColor, _setSelectedColor] = useState("#db0A5b");
  
  const setSelectedColor = (color) => {
    if (props.onChangeColor && color !== selectedColor) {
      props.onChangeColor(color);
    }
    _setSelectedColor(color);
  }
  function renderShades(h) {
    console.log("h=" + h);
    let w = 100, b;
    let colors = [];
    for (let i = 0; i < 8; i++) {
        b = 10;
      
        for (let j = 0; j < 10; j++) {
            let color = new Color(`hsl(${h},${w},${b})`).tohex();
            colors.push(color);
            b += 9;
        }
  
        w -= 12;
    }
    return colors.map((color) => <ColorBox style={[styles.shadesColorBox]} onPress={() => setSelectedColor(color)} color={color}/>);
  }
  return (
    <View props={props} style={[...props.style, styles.container]}>
      
      <View style={styles.primaryColorsView}>
        {colors.map(color => <ColorBox onPress={() => {setPrimarySelectedColor(color); setSelectedColor(color);}} color={color} style={[styles.primaryColorBox]}/>)}
      </View>
      <View style={styles.shadesView}>
        {renderShades(new Color(primarySelectedColor).hsl[0])}
      </View>
      <View style={styles.selectedColorView}>
        <TextInput 
            style={styles.input}
            value={selectedColor}
            onChangeText={color => {}}
        />
        <View style={[styles.selectedColor, {backgroundColor: selectedColor}]}></View>
      </View>
    </View>
  )
}
function ColorBox(props) {
  return <Touchable onPress={props.onPress} props={props} style={[props.style, styles.colorBox, {backgroundColor: props.color}]} background={Touchable.Ripple("white", true)}>
    <View/>
  </Touchable>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
  },
  primaryColorsView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  shadesView: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedColorView: {
    flexDirection: "row",
    flex: 1,
  },
  colorBox: {
    width: "10%",
  },
  primaryColorBox: {
    height: "50%",
  },
  shadesColorBox: {
    height: "12%",
  }, 
 
  selectedColor: {
    height: "100%",
    width: "50%",
  },
  input: {
    width: "50%",
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
});
export {CromaColorPicker }