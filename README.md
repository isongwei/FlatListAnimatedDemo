## FlatList-列表入场动画

### 前言

网上查找资料：RN FlatList入场动画，竟然一个都没搜索到，而且还是百度+google双大法。最后没办法，只能自己仔细看Animated库怎么使用，各种属性都慢慢试了，才大致弄清楚动画的实现。先看实现的效果图：

### 效果图1

![merge.gif](https://upload-images.jianshu.io/upload_images/4725810-20021dc87d7de1a5.gif?imageMogr2/auto-orient/strip)

### 效果图2
![![mergeX.gif](https://upload-images.jianshu.io/upload_images/4725810-3d306d1202b08e50.gif?imageMogr2/auto-orient/strip)

### 效果图3
![x.gif](https://upload-images.jianshu.io/upload_images/4725810-8dae20c6eebdef6c.gif?imageMogr2/auto-orient/strip)

### 项目中的效果图

![project.gif](https://upload-images.jianshu.io/upload_images/4725810-a47c9e5eac152bf4.gif?imageMogr2/auto-orient/strip)

gif有点卡，真机运行是很流畅的。

	
### 动画基本介绍
ReactNative的view动画效果主要使用Animated库来进行制作，通过start和stop来进行控制动画的启动。animate封装了四个可以动画化的组件：View，Text,Image,ScrollView。也可以使用Animated.createAnimatedComponent()封装自己的动画组件。

简单的使用方式（中文网上的代码），淡入动画效果的视图：
	
	import React from 'react';
	import { Animated, Text, View } from 'react-native';
	
	class FadeInView extends React.Component {
	  state = {
	    fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
	  }
	
	  componentDidMount() {
	    Animated.timing(                  // 随时间变化而执行动画
	      this.state.fadeAnim,            // 动画中的变量值
	      {
	        toValue: 1,                   // 透明度最终变为1，即完全不透明
	        duration: 10000,              // 让动画持续一段时间
	      }
	    ).start();                        // 开始执行动画
	  }
	
	  render() {
	    let { fadeAnim } = this.state;
	
	    return (
	      <Animated.View                 // 使用专门的可动画化的View组件
	        style={{
	          ...this.props.style,
	          opacity: fadeAnim,         // 将透明度指定为动画变量值
	        }}
	      >
	        {this.props.children}
	      </Animated.View>
	    );
	  }
	}
	
	// 然后你就可以在组件中像使用`View`那样去使用`FadeInView`了
	export default class App extends React.Component {
	  render() {
	    return (
	      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
	        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
	          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
	        </FadeInView>
	      </View>
	    )
	  }
	}
		

### Animated的动画基本配置方法有timing，spring，decay；

#### 1、timing	
它是线性动画，在设定时间内移动到终点，中间的动画可以设置
		
	toValue:线性改变的数值
	
	duration: 动画持续时间 默认500.
	
	easing:默认的实现Easing.in和Easing.out和Easing.inOut。
	
	delay: 动画延迟开始时间。

简单的使用方式：
	
	 Animated.timing(
            this.state.animatePress, {
                toValue: 0.8,
                duration: 200
            }
        ).start();


#### 2、spring	
类似弹簧的实现，动画结束时会有个渐弱的摆动，它的属性在源码中可以看到有很多：
	
	interface SpringAnimationConfig extends AnimationConfig {
        toValue: number | AnimatedValue | { x: number; y: number } | AnimatedValueXY;
        overshootClamping?: boolean;
        restDisplacementThreshold?: number;
        restSpeedThreshold?: number;
        velocity?: number | { x: number; y: number };
        bounciness?: number;
        speed?: number;
        tension?: number;
        friction?: number;
        stiffness?: number;
        mass?: number;
        damping?: number;
        delay?: number;
    }

常用的有：
toValue:线性改变的数值
friction：弹簧界限值，越小弹的越大，默认7
tension：弹簧张力，默认40，越大进入的速度越快

简单的使用方式：

	 Animated.spring(this.state.animateItem, {
                            toValue: 1,
                            velocity: 0.1,
                            bounciness: 5,
							friction：5
                        }),

#### 3、decay
动画的速度逐渐变慢，最后停止，类似上面的转场动画


	
###Animated的动画组合方式有：parallel，sequence，stagger，

parallel：并行运行动画

sequence:依次运行动画，如果一个动画被停止了，那么下一个动画就不会被执行。

stagger：每个动画延迟一段时间执行	


这三个动画的基本入参是动画数组，stagger有额外的time（延时）参数。而且数组内仍然可以传入parallel，sequence，stagger等各种类型，安装规则进行动画播放。

栗子如下：

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


### 效果图的实现
动画的基本介绍完成后，在看看效果图，其实就是动画简单的组合，使用了transform参数，另外加了个插值器。	

核心代码：

	 <Animated.View style={{
                    backgroundColor: "transparent",
                    margin: 5,
                    transform: [
                        {
                            scale: this.state.animatePress
                        },
                        {
                            translateX: this.state.animateItem.interpolate({
                                inputRange: [0, 1],
                                outputRange: [700, 1]
                            })
                        }
                    ]
                }}
	

对FlatList的子Item进行封装，全部代码如下（其中一个组件的文件）：
	
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
	        const delay = index * 300
	        Animated.timing(this.state.animateItem, {
	            toValue: 1,
	            duration: 1000,
	            delay: delay
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
	                            translateX: this.state.animateItem.interpolate({
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
	
### Animated使用中遇到的问题
FlatList横向排列，使用translateX参数，进行子item的入参动画，从屏幕外进入到相应的位置。开发完成后，发现在ios表现正常，但是在android中存在问题，子item不会从屏幕外进入，而是在item的原先位置进行展示，看图：

IOS正常表现：

![g3vhq.gif](https://upload-images.jianshu.io/upload_images/4725810-78b9ebb9289ea62e.gif?imageMogr2/auto-orient/strip)


android异常表现：

![l8tic.gif](https://upload-images.jianshu.io/upload_images/4725810-7d2d5845e1bd798d.gif?imageMogr2/auto-orient/strip)  

这个问题被折磨了2天时间，网上各种查找资料都没有，后来在startoverflow上发现一个和我遇到同样问题的人，但是并没有得到解决，地址如下：[StackOverFlow上有人遇到同样的错误](https://stackoverflow.com/questions/50568052/flat-list-android-animation-doesnt-work-as-expected/55822260#55822260)


后来突然想到FlatList有个优化属性：getItemLayou，当我加入后，android端就表现正常了，对FlatList添加的代码如下：

	          getItemLayout={(data, index) => (
                    { length: 200, offset: 200 * index, index }
              )}

getItemLayou的作用是为了不让FlatList在渲染过程中对内容尺寸做动态计算，在该方法中给予他设定的高度，但是使用它的前提是知道Item的宽高，如果item的宽高是固定的，使用这个方法就会大大优化列表性能，如果数据少，可能不明显，但是数据量大的时候就会表现比较明显。

加入这个方法能够解决这个问题，但是我不知道是什么原因导致的这样，而且这个方法我这样写动画也能渲染正常：

	getItemLayout={(data, index) => (
        { length: 1, offset: 1 , index }
	  )}

所以这个地方很纠结,不过这个bug在最新的版本0.59.5中已近解决了，不需要使用getItemLayout也能正常播放动画。

		
		入场动画bug版本：
		0.59.4版本及之前的版本都存在此bug，不过在0.59.5版本中修复了该问题。在package.json中查看版本号：
		
				"react-native": "0.59.4",
				//该版本已修复入场动画的bug
			    "react-native": "0.59.5"



### 代码

[效果图的代码在此处](https://github.com/zouanfu/FlatListAnimatedDemo)

[我的简书地址](https://www.jianshu.com/p/fe5b18a5b8b7)

### 最后感谢
[RN中文网](https://reactnative.cn/docs/animated/#%E9%85%8D%E7%BD%AE%E5%8A%A8%E7%94%BB)



