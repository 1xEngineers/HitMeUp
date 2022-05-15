import { Text } from '@hmu-component/text'
import { Title } from '@hmu-component/title'
import { ById } from '@hmu-frontend/util'
import { CountryCode } from 'libphonenumber-js'
import { Divider } from 'native-x-divider'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React, { useCallback, useMemo, useState } from 'react'
import { SectionList } from 'react-native'
import { useDebounce } from 'use-debounce'
import countriesFromJSON from './country-code.json'
import { SearchBox } from './search-box'

interface Country {
  countryCode: CountryCode
  name: string
  code: string
  group?: string
}

interface Props {
  onChange?: (country: Country) => void
}

interface CountrySection {
  title: string
  data: Country[]
}

function keyExtractor(item: Country, index: number) {
  return `${item.countryCode}:${index}`
}

function sortByTitle(a: CountrySection, b: CountrySection) {
  return a.title.localeCompare(b.title)
}

function countryFilter(expression: RegExp) {
  return (country: Country) => expression.test(country.name) || expression.test(country.code)
}

function toCountriesSections(countries: Country[]): CountrySection[] {
  const popularCountriesByTitle = {
    title: 'Popular',
    data: countries.filter(country => country.group === 'Popular'),
  }

  const otherCountries = countries.filter(country => country.group !== 'Popular')

  const sectionsByTitle = otherCountries.reduce((countrySections, country: Country) => {
    const title = country.name.substring(0, 1).toUpperCase()
    if (!countrySections[title]) {
      countrySections[title] = { title, data: [] }
    }
    countrySections[title].data.push(country)
    return countrySections
  }, {} as ById<CountrySection>)

  return [popularCountriesByTitle, ...Object.values(sectionsByTitle).sort(sortByTitle)]
}

const countriesBySection = toCountriesSections(countriesFromJSON as Country[])

export function CountryPicker({ onChange }: Props) {
  const [text, setText] = useState('')
  const [query] = useDebounce(text, 300)

  const filteredSections = useMemo(() => {
    const searchText = query.trim().replace(/[^a-zA-Z0-9]/g, '')
    if (searchText === '') {
      return countriesBySection
    }
    const search = countryFilter(new RegExp(searchText, 'i'))
    return countriesBySection
      .map(countrySection => ({ ...countrySection, data: countrySection.data.filter(search) }))
      .filter(({ data }) => data.length > 0)
  }, [query])

  const renderSectionHeader = useCallback(({ section: { title } }) => {
    return (
      <Stack padding='horizontal:normal' backgroundColor={COLOR.PRIMARY}>
        <Spacer size='small' />
        <Text textColor={COLOR.TERTIARY} semiBold lineHeight='relax'>
          {title}
        </Text>
        <Divider />
      </Stack>
    )
  }, [])

  const renderFooter = useCallback(() => {
    return <Spacer />
  }, [])

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Tappable data={item} onTap={onChange}>
          <Stack horizontal padding='normal' alignMiddle justifyBetween>
            <Stack horizontal alignMiddle>
              <Spacer size='small' />
              <Stack fill>
                <Text bold fontSize='large' numberOfLines={1}>
                  {item.name?.toLowerCase()}
                </Text>
              </Stack>
              <Text textColor={COLOR.TERTIARY}>{item.code}</Text>
            </Stack>
          </Stack>
        </Tappable>
      )
    },
    [onChange],
  )

  return (
    <Stack fill>
      <Spacer size='normal' />
      <Title alignCenter>choose your country</Title>
      <Spacer size='small' />
      <Stack padding='horizontal:normal'>
        <SearchBox onQuery={setText} />
      </Stack>
      <Stack fill>
        <SectionList
          sections={filteredSections}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </Stack>
    </Stack>
  )
}
