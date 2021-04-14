import React from 'react'
import { Link, Box } from '@material-ui/core'
import { LogoIcon } from 'common/icons'
import { useStyles } from './styles'
const social = [
  {
    title: 'Twitter',
    href: '#',
  },
  {
    title: 'Github',
    href: '#',
  },
  {
    title: 'Medium',
    href: '#',
  },
]

const links = [
  {
    title: 'FAQ',
    href: '#',
  },
  {
    title: 'Help',
    href: '#',
  },
  {
    title: 'Terms of Use',
    href: '#',
  },
  {
    title: 'Coockie Policy',
    href: '#',
  },
  {
    title: 'Privacy Policy',
    href: '#',
  },
]

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Box className={classes.social} display={'flex'} alignItems={'center'}>
        <LogoIcon className={classes.logo} />
        {social.map((s) => (
          <Link key={s.title} color={'inherit'} underline={'hover'} href={s.href}>
            {s.title}
          </Link>
        ))}
      </Box>
      <Box className={classes.linksWrapper}>
        {links.map((s) => (
          <Link key={s.title} color={'inherit'} underline={'hover'} href={s.href}>
            {s.title}
          </Link>
        ))}
      </Box>
    </footer>
  )
}
