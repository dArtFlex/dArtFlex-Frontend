import React from 'react'
import { createBrowserHistory } from 'history'
import { IAppRouterProps } from './types'
import { Router, Switch, Redirect, Route } from 'react-router-dom'
import routes from '../routes'
import RouteHOC from './RouteHOC'
import Bids, { BidDetails } from 'pages/Bids'
import Sales from 'pages/Sales'
import Artworks from '../pages/Artworks'
import AccountSettings from '../pages/AccountSettings'
import Dashboard from '../pages/Dashboard'
import SellNFT from '../pages/SellNFT'
import CreateNFT from '../pages/CreateNFT'
import Constructor from '../pages/Constructor'
import TradingHistory from '../pages/TradingHistory'
import ArtworkDetails from '../pages/ArtworkDetails'
import ContentManagement from '../pages/ContentManagement'
import Profile from '../pages/Profile'
import PrivacyPolicy from '../pages/AuxiliaryPages/components/PrivacyPolicy'
import { CommunityGuidelines, DAFPage } from '../pages/AuxiliaryPages/components'
import TermsOfService from '../pages/AuxiliaryPages/components/TermsOfService'
import MyAlbum from '../pages/MyAlbum'
import Wellcome from '../pages/Wellcome'

export const history = createBrowserHistory()

const MainNavigation = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const appRoutes: IAppRouterProps[] = [
    {
      path: routes.artworks,
      component: <Artworks />,
    },
    {
      path: routes.artworkAccountSettings,
      component: <AccountSettings />,
    },
    {
      path: routes.dashboard,
      component: <Dashboard />,
    },
    {
      path: routes.dashboard,
      component: <Dashboard />,
    },
    {
      path: routes.profile,
      component: <Profile />,
    },
    {
      path: routes.sellNFT,
      component: <SellNFT />,
    },
    {
      path: routes.createNFT,
      component: <CreateNFT />,
    },
    {
      path: routes.constructor,
      component: <Constructor />,
    },
    {
      path: routes.tradingHistory,
      component: <TradingHistory />,
    },
    {
      path: routes.bids,
      component: <Bids />,
    },
    {
      path: routes.bidDetails,
      component: <BidDetails />,
    },
    {
      path: routes.sales,
      component: <Sales />,
    },
    {
      path: routes.artworkDetails,
      component: <ArtworkDetails />,
    },

    {
      path: routes.blog,
      component: <div>blog</div>,
    },
    {
      path: routes.contentManagement,
      component: <ContentManagement />,
    },
    {
      path: routes.privacyPolicy,
      component: <PrivacyPolicy />,
    },
    {
      path: routes.aboutDAF,
      component: <DAFPage />,
    },
    {
      path: routes.communityGuidelines,
      component: <CommunityGuidelines />,
    },
    {
      path: routes.termsOfService,
      component: <TermsOfService />,
    },
    {
      path: routes.myAlbum,
      component: <MyAlbum />,
    },
  ]

  return (
    <Router history={history}>
      <Switch>
        <RouteHOC exact path="/" toggleTheme={toggleTheme}>
          <Redirect to={routes.artworks} />
        </RouteHOC>

        {appRoutes.map(({ path, component, ...rest }) => (
          <RouteHOC exact path={path} key={path} toggleTheme={toggleTheme} {...rest}>
            {component}
          </RouteHOC>
        ))}
        <Route path={routes.wellcome}>
          <Wellcome />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainNavigation
