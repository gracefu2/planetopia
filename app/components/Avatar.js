import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Avatar = ({type, small=false}) => {
  return (
    <View>
      { type==='bear' &&
        <Image source={require('../../assets/profile-pics/bear.png')} style={small ? styles.smallImage : styles.image} />
      }
      { type==='octopus' &&
        <Image source={require('../../assets/profile-pics/octopus.png')} style={small ? styles.smallImage : styles.image} />
      }
      { type==='crab' &&
        <Image source={require('../../assets/profile-pics/crab.png')} style={small ? styles.smallImage : styles.image} />
      }
      { type==='fish' &&
        <Image source={require('../../assets/profile-pics/fish.png')} style={small ? styles.smallImage : styles.image} />
      }
      { type==='lion' &&
        <Image source={require('../../assets/profile-pics/lion.png')} style={small ? styles.smallImage : styles.image} />
      }
      { type==='whale' &&
        <Image source={require('../../assets/profile-pics/whale.png')} style={small ? styles.smallImage : styles.image} />
      }
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 50
  },
  smallImage: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderColor: 'transparent',
    borderRadius: 25
  },
})