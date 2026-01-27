'use client'
import Link from 'next/link'
import Logo from '@/assets/logo.svg'

export const LogoLink = () => (
  <Link href="/" prefetch>
    <Logo aria-label="Логотип АО «Опытно-технологический завод»" />
  </Link>
)
