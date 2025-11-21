import { StaticImageData } from 'next/image'
import ArImg from '@/assets/images/industrial-gases/ar.png'
import C2H2Img from '@/assets/images/industrial-gases/c2h2.png'
import C3H8Img from '@/assets/images/industrial-gases/c3h8.png'
import CO2Img from '@/assets/images/industrial-gases/co2.png'
import GasImg from '@/assets/images/industrial-gases/gas.png'
import HeImg from '@/assets/images/industrial-gases/he.png'
import N2Img from '@/assets/images/industrial-gases/n2.png'
import O2Img from '@/assets/images/industrial-gases/o2.png'
import PureGasImg from '@/assets/images/industrial-gases/pure-gas.png'

export type IndustrialGasVariation = {
  title: string
  volumes: number[]
  description: string
}

export type IndustrialGas = {
  title: string
  image: StaticImageData
  uri: string
  variations: IndustrialGasVariation[]
}

export const INDUSTRIAL_GASES: IndustrialGas[] = [
  {
    title: 'Газовая смесь',
    image: GasImg,
    uri: 'gas-mixture',
    variations: [],
  },
  {
    title: 'Азот',
    image: N2Img,
    uri: 'nitrogen',
    variations: [
      {
        title: 'Азот в баллонах',
        volumes: [5, 10, 40],
        description:
          'Технический газ\nПервый сорт\nГОСТ 9293-74\nНоминальное давление при температуре 20 °C - 150 атм',
      },
      {
        title: 'Азотный баллон',
        volumes: [5, 10, 40],
        description: 'Технический баллон для азота',
      },
    ],
  },
  {
    title: 'Ацетилен',
    image: C2H2Img,
    uri: 'acetylene',
    variations: [],
  },
  {
    title: 'Кислород',
    image: O2Img,
    uri: 'oxygen',
    variations: [],
  },
  {
    title: 'Аргон',
    image: ArImg,
    uri: 'argon',
    variations: [],
  },
  {
    title: 'Углекислота',
    image: CO2Img,
    uri: 'carbon-dioxide',
    variations: [],
  },
  {
    title: 'Гелий',
    image: HeImg,
    uri: 'helium',
    variations: [],
  },
  {
    title: 'Пропан',
    image: C3H8Img,
    uri: 'propane',
    variations: [],
  },
  {
    title: 'Чистые газы',
    image: PureGasImg,
    uri: 'pure-gases',
    variations: [],
  },
]
