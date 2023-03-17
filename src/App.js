import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout';
import AddUser from './components/Adduser/AddUser'
import Users from './components/Users/Users'
import RemovedUsers from './components/Removedusers/RemovedUsers'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AboutUs from './components/AboutUs/AboutUs';
import UserProfile from './components/user-profile/UserProfile'
import Products from './components/products/Products'
import Cart from './components/cart/Cart';


function App() {

  //create Browser Router Object.
const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/Register",
        element:<AddUser/>
      },
      {
        path:'/Login',
        element:<Login/>
      },{
        path:'/AboutUs',
        element:<AboutUs/>
      },
      //route for user-profile
      {
        path:"/user-profile",
        element:<UserProfile/>,
        children:[
          {
            path:"products",
            element:<Products/>
          },
          {
            path:"cart",
            element:<Cart/>
          }
        ]
      }

    ]
  }
])

  return (
  <div >
<RouterProvider router={router}/>
  </div>
  );
}

export default App;
