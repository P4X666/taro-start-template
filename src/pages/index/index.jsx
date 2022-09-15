import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import dayjs from 'dayjs';
import './index.less';

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className="index">
        <Text>Hello world! { dayjs().format() }</Text>
      </View>
    );
  }
}
