import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import sizing from '../../../theme/sizing'
import Animated, { Easing, FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import colors from '../../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/general/Button'
import { useUser } from '../../../context/UserContext'

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const [currentSlide, setCurrentSlide] = useState(1)

  const widths = useSharedValue([45, 15, 15, 15, 15])
  const highlightColor = colors.darkGray
  const secondaryColor = colors.gray
  const bubbleColors = useSharedValue([highlightColor, secondaryColor, secondaryColor, secondaryColor])

  const style1 = useAnimatedStyle(() => {return {width: withTiming(widths.value[0], {easing: Easing.inOut(Easing.quad)}), backgroundColor: withTiming(bubbleColors.value[0], {easing: Easing.inOut(Easing.quad)})}})
  const style2 = useAnimatedStyle(() => {return {width: withTiming(widths.value[1], {easing: Easing.inOut(Easing.quad)}), backgroundColor: withTiming(bubbleColors.value[1], {easing: Easing.inOut(Easing.quad)})}})
  const style3 = useAnimatedStyle(() => {return {width: withTiming(widths.value[2], {easing: Easing.inOut(Easing.quad)}), backgroundColor: withTiming(bubbleColors.value[2], {easing: Easing.inOut(Easing.quad)})}})
  const style4 = useAnimatedStyle(() => {return {width: withTiming(widths.value[3], {easing: Easing.inOut(Easing.quad)}), backgroundColor: withTiming(bubbleColors.value[3], {easing: Easing.inOut(Easing.quad)})}})
  const style5 = useAnimatedStyle(() => {return {width: withTiming(widths.value[4], {easing: Easing.inOut(Easing.quad)}), backgroundColor: withTiming(bubbleColors.value[4], {easing: Easing.inOut(Easing.quad)})}})
  
  const goNext = async () => {
    if (currentSlide==1) {
      widths.value = [15, 45, 15, 15, 15]
      bubbleColors.value = [secondaryColor, highlightColor, secondaryColor, secondaryColor, secondaryColor]
    } else if (currentSlide==2) {
      widths.value = [15, 15, 45, 15, 15]
      bubbleColors.value = [secondaryColor, secondaryColor, highlightColor, secondaryColor, secondaryColor]
    } else if (currentSlide==3) {
      widths.value = [15, 15, 15, 45, 15]
      bubbleColors.value = [secondaryColor, secondaryColor, secondaryColor, highlightColor, secondaryColor]
    } else if (currentSlide==4) {
      widths.value = [15, 15, 15, 15, 45]
      bubbleColors.value = [secondaryColor, secondaryColor, secondaryColor, secondaryColor, highlightColor]
    }
    setCurrentSlide(prev => prev+1)
  }

  const data = [
    {num: 1, title: "Welcome to Planetopia 👋", head: "Sustainable Living Made Simple", desc: "Join a community of eco-conscious individuals and explore simple ways to make a positive impact on our planet."},
    {num: 2, title: "Eco News & Events 🌿", head: "Stay Informed, Stay Inspired", desc: "Get the latest updates on sustainability, climate, and green initiatives worldwide. Plus, find local events and meet like-minded people near you!"},
    {num: 3, title: "Community & Challenges 🤝", head: "Connect and Take Action", desc: "Engage in eco-challenges and set sustainable goals. Earn points, track your progress, and rise up the leaderboard to inspire others."},
    {num: 4, title: "Create an Eco Profile 🌱", head: "Track Your Journey to a Greener Planet", desc: "Customize your profile, track your carbon footprint, and watch your achievements grow as you contribute to a healthier planet."},
    {num: 5, title: "Planet Restoration 🌌", head: "Restore Virtual Habitats, Rebuild Our World", desc: "Restore diverse virtual habitats as you achieve milestones. Learn about each ecosystem and witness the impact of your efforts."},
  ]


  const userData = useUser()
  useEffect(() => {
    if (userData) {
      navigation.navigate('BottomTab')
    }
  }, [userData])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require("../../../assets/icon.png")} resizeMode="contain" />
        {/* <Text style={{ fontFamily: 'Poppins_400Regular' }}>Planetopia</Text> */}
      </View>

      <View style={styles.bottomContainer}>
        <View style={{gap: 40}}>
          <View style={styles.slidesContainer}>
            <Animated.View style={[style1, styles.slides]} />
            <Animated.View style={[style2, styles.slides]} />
            <Animated.View style={[style3, styles.slides]} />
            <Animated.View style={[style4, styles.slides]} />
            <Animated.View style={[style5, styles.slides]} />
          </View>

          <Animated.View entering={FadeIn}>
            <Text style={{marginBottom: 8, fontSize: 48, fontWeight: 500, marginBottom: 32}}>{data[currentSlide-1].title}</Text>
            {/* <Text style={{marginBottom: 8, fontSize: 24}}>{data[currentSlide-1].head}</Text> */}
            <Text style={{marginBottom: 8, fontSize: 24}}>{data[currentSlide-1].desc}</Text>
          </Animated.View>
        </View>

        {
          currentSlide!==5 ?
          <Button onPress={goNext} text="Next →"/> :
          <View style={{gap: 10}}>
            <Button onPress={() => navigation.navigate("CreateAccount")} text="Create an account" />
            <Button onPress={() => navigation.navigate('Login')} text="Login" white={true} />
          </View>
        }
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  title: {
    fontSize: sizing.lg,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: sizing.defaultContainerPadding,
    textAlign: 'center',
  },
  logo: {
    width: "85%",
    height: 500,
    marginTop: sizing.xl,
    marginBottom: sizing.md,
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "40%",
    justifyContent: "center",
    paddingHorizontal: sizing.lg,
    alignItems: "center"
  },
  bottomContainer: {
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: "60%",
    backgroundColor: colors.offWhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: sizing.lg,
    paddingVertical: sizing.xl,
    gap: sizing.lg,
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: sizing.xs },
    shadowOpacity: 0.25,
    shadowRadius: sizing.lg,
  },
  slides: {
    height: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  slidesContainer: {
    flexDirection: "row"
  }
})