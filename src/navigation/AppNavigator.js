import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import FavoriteScreen from '../screens/FavoritesScreen'
import AboutScreen from '../screens/AboutScreen'
import DetailScreen from '../screens/DetailScreen'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    )
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Favorites" component={FavoriteScreen} />
                <Tab.Screen name="About" component={AboutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;