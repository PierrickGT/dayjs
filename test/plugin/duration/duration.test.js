import MockDate from 'mockdate'
import dayjs from '../../../src'
import duration from '../../../src/plugin/duration'
import relativeTime from '../../../src/plugin/relativeTime'
import '../../../src/locale/fr'
import '../../../src/locale/es'

dayjs.extend(relativeTime)
dayjs.extend(duration)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Is duration', () => {
  expect(dayjs.isDuration(dayjs.duration())).toBe(true)
  expect(dayjs.isDuration(dayjs.duration(1))).toBe(true)
  expect(dayjs.isDuration(dayjs())).toBe(false)
  expect(dayjs.isDuration({})).toBe(false)
  expect(dayjs.isDuration()).toBe(false)
})

it('toJSON', () => {
  expect(JSON.stringify({
    postDuration: dayjs.duration(5, 'minutes')
  })).toBe('{"postDuration":"P5M"}')
})

describe('Humanize', () => {
  it('Humaniz', () => {
    expect(dayjs.duration(1, 'minutes').humanize()).toBe('a minute')
    expect(dayjs.duration(2, 'minutes').humanize()).toBe('2 minutes')
    expect(dayjs.duration(24, 'hours').humanize()).toBe('a day')
    expect(dayjs.duration(1, 'minutes').humanize(true)).toBe('in a minute')
    expect(dayjs.duration(-1, 'minutes').humanize(true)).toBe('a minute ago')
  })

  it('Locale', () => {
    expect(dayjs.duration(1, 'minutes').humanize(true)).toBe('in a minute')
    expect(dayjs.duration(1, 'minutes').locale('fr').humanize(true)).toBe('dans une minute')
    expect(dayjs.duration(1, 'minutes').locale('es').humanize(true)).toBe('en un minuto')
  })
})

describe('Clone', () => {
  it('Locale clone', () => {
    const d = dayjs.duration(1, 'minutes').locale('fr')
    const r = 'dans une minute'
    expect(d.humanize(true)).toBe(r)
    expect(d.clone().humanize(true)).toBe(r)
  })
})

describe('Milliseconds', () => {
  expect(dayjs.duration(500).milliseconds()).toBe(500)
  expect(dayjs.duration(1500).milliseconds()).toBe(500)
  expect(dayjs.duration(15000).milliseconds()).toBe(0)
  expect(dayjs.duration(500).asMilliseconds()).toBe(500)
  expect(dayjs.duration(1500).asMilliseconds()).toBe(1500)
  expect(dayjs.duration(15000).asMilliseconds()).toBe(15000)
})

describe('Seconds', () => {
  expect(dayjs.duration(500).seconds()).toBe(0)
  expect(dayjs.duration(1500).seconds()).toBe(1)
  expect(dayjs.duration(15000).seconds()).toBe(15)
  expect(dayjs.duration(500).asSeconds()).toBe(0.5)
  expect(dayjs.duration(1500).asSeconds()).toBe(1.5)
  expect(dayjs.duration(15000).asSeconds()).toBe(15)
})

describe('Minutes', () => {
  expect(dayjs.duration(100000).minutes()).toBe(1)
  expect(dayjs.duration(100000).asMinutes().toFixed(2)).toBe('1.67')
})

describe('Hours', () => {
  expect(dayjs.duration(10000000).hours()).toBe(2)
  expect(dayjs.duration(10000000).asHours().toFixed(2)).toBe('2.78')
})
