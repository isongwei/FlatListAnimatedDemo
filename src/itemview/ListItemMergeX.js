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
        animateItem: new Animated.Value(0),
        animateOpacity: new Animated.Value(0),
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
        const delay = index * 100
        //动画并行parallel
        Animated.parallel(
            [   
                //动画顺序执行
                Animated.sequence(
                    [
                        Animated.delay(delay),
                        // Animated.spring(this.state.animateItem, {
                        //     toValue: 1,
                        //     velocity: 0.1,
                        //     bounciness: 5,
                        // }),
                        Animated.timing(this.state.animateItem, {
                            toValue: 1,
                            duration: 500,
                            // delay: delay
                        })
                    ]
                ),
                Animated.sequence(
                    [
                        Animated.delay(delay),
                        Animated.timing(this.state.animateOpacity, {
                            toValue: 1,
                            duration: 1000
                        })
                    ]
                )

            ]
        ).start()

    }

    render() {
        const { text, index } = this.props;
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
                <Animated.View style={{
                    margin: 5,
                    opacity: this.state.animateOpacity,
                    backgroundColor: 'red', 
                    transform: [
                        {
                            scale: this.state.animatePress
                        },
                        {
                            translateX: this.state.animateItem.interpolate({
                                inputRange: [0, 1],
                                outputRange: [700, 1],
                                // outputRange: ["0deg", "360deg"]
                            })
                        }
                    ]
                }}
                >
                    <Text
                        style={{ width: 100, height: 100, }}
                    >
                        {text}{index}
                    </Text>
                </Animated.View>

            </TouchableWithoutFeedback>
        );

    }

}