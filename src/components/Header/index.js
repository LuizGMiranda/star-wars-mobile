import React, {Fragment} from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';

const Header = ({ title = ''}) => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#FEE123" />
      <Text style={styles.header}>{title}</Text>
    </Fragment>
  );
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: "#FEE123",
      fontSize: 26,
      padding: 26,
      textAlign: "center",
    },
  });
  
export default Header;