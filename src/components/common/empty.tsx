import {StyleSheet, View} from 'react-native';
import React from 'react';
import Typography from './typography';

type Props = {
  message: string;
};

const Empty = (props: Props) => {
  const {message} = props;
  return (
    <View style={styles.container}>
      <Typography center title bold>
        {message}
      </Typography>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 15,
  },
});
