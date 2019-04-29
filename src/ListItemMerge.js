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

import ListItemMerge from './itemview/ListItemMerge';


export default class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    numColumns={2}
                    horizontal={false}
                    renderItem={({ item, index }) => {
                        return <ListItemMerge
                            index={index}
                            text={item.name}
                        />
                    }}
                    keyExtractor={
                        (item, index) => { return `${item.name + index}` }
                    }
                />
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