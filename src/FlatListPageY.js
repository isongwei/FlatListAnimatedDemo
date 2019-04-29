/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button
} from 'react-native';

import ListItemY from './itemview/ListItemY';


export default class App extends Component {

    render() {
        return (
            <View style={styles.container}>

                <View
                    style={styles.btnStyle}
                >
                    <FlatList
                        data={data}
                        numColumns={2}
                        horizontal={false}
                        renderItem={({item, index}) => {
                            return <ListItemY
                                index={index}
                                text={item.name}
                            />
                        }}

                        keyExtractor={
                            (item, index) => { return `${item.name + index}` }
                        }
                    />
                </View>
                <View
                    style={styles.btnStyle}
                >
                    <Button
                        title='入场动画-X轴进入'
                    />
                </View>
                <View
                    style={styles.btnStyle}
                >
                    <Button
                        title='入场动画-子动画动态延迟'
                    />
                </View>
                <View
                    style={styles.btnStyle}
                >
                    <Button
                        title='入场动画-动画结合'
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    btnStyle: {
        margin: 15
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const data = [
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
    { name: '测试' },
]