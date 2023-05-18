import About from "../pages/About"
import Home from "../pages/Home"
import Message from "../pages/Message"
import News from "../pages/News"
import Msgs from "../pages/Msgs"
import { Navigate } from "react-router-dom"

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/home',
      element: <Home />,
      children: [
        {
          path: 'news',
          element: <News />
        },

        {
          path:'message',
          element: <Message />,
          children: [
            {
              // path: 'msgs/:id/:title/:content', // params传参
              path: 'msgs', // search传参
              element: <Msgs />
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <Navigate to="/about" />
    }
  ]