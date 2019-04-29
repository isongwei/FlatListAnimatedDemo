import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';

export default class ListItem extends Component {
    state = {
        animatePress: new Animated.Value(1),
        animateItem: new Animated.Value(0)
    }

    animateIn() {
        Animated.timing(
            this.state.animatePress, {
                toValue: 0.8,
                duration: 200
            }
        ).start();
    }

    animateOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 200
        }).start();
    }

    componentWillMount() {
        const { index } = this.props;
        const delay = index * 500
        Animated.timing(this.state.animateItem, {
            toValue: 1,
            duration: 1000,
            delay:delay
        }).start();
    }

    render() {
        const { text,index } = this.props;
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <Animated.View style={{
                    backgroundColor: "transparent",
                    margin: 5,
                    transform: [
                        {
                            scale: this.state.animatePress
                        },
                        {
                            translateY: this.state.animateItem.interpolate({
                                inputRange: [0, 1],
                                outputRange: [700, 1]
                            })
                        }
                    ]
                }}
                >
                    <Text
                        style={{ width: 150, height: 100, backgroundColor: 'yellow', }}
                    >
                        {text}{index}
                    </Text>
                </Animated.View>

            </TouchableWithoutFeedback>
        );

    }

}