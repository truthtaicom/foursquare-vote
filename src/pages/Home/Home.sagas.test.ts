jest.mock('../../shared/services/venues', () => ({
  searchVenues: jest.fn()
}));

import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { searchVenues } from '../../shared/services/venues';
import { searchVenuesSuccess, searchVenuesFailure } from './Home.action';
import { SEARCH_VENUES_REQUEST } from './Home.actionTypes';
import { searchVenuesAction, homeSaga } from './Home.sagas';
import { mainSaga } from '../../App.store';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('sagas', () => {
  const mockData = {
    meta: { code: 200, requestId: '5d0a6886e97dfb002cab2efb' },
    response: {
      venues: [
        {
          id: '54199179498e6e1206f0b810',
          name: 'Lunch Time',
          contact: {},
          location: {
            address: 'Jägerstr. 34',
            lat: 52.51427792365403,
            lng: 13.396987908146501,
            labeledLatLngs: [
              {
                label: 'display',
                lat: 52.51427792365403,
                lng: 13.396987908146501
              }
            ],
            postalCode: '10117',
            cc: 'DE',
            city: 'Berlin',
            state: 'Berlin',
            country: 'Germany',
            formattedAddress: ['Jägerstr. 34', '10117 Berlin', 'Germany']
          },
          categories: [
            {
              id: '4bf58dd8d48988d16d941735',
              name: 'Café',
              pluralName: 'Cafés',
              shortName: 'Café',
              icon: {
                prefix: 'https://ss3.4sqi.net/img/categories_v2/food/cafe_',
                suffix: '.png'
              },
              primary: true
            }
          ],
          verified: true,
          stats: {
            tipCount: 0,
            usersCount: 0,
            checkinsCount: 0,
            visitsCount: 0
          },
          beenHere: {
            count: 0,
            lastCheckinExpiredAt: 0,
            marked: false,
            unconfirmedCount: 0
          },
          venuePage: { id: '150176200' },
          hereNow: { count: 0, summary: 'Nobody here', groups: [] },
          referralId: 'v-1560963206',
          venueChains: [],
          hasPerk: false
        },
        {
          id: '51b860e0498e8c7127b712f7',
          name: 'alexLUNCH',
          contact: {},
          location: {
            address: 'Alexanderstr 3',
            lat: 52.52354517036949,
            lng: 13.413464339715476,
            labeledLatLngs: [
              {
                label: 'display',
                lat: 52.52354517036949,
                lng: 13.413464339715476
              }
            ],
            postalCode: '10178',
            cc: 'DE',
            city: 'Berlin',
            state: 'Berlin',
            country: 'Germany',
            formattedAddress: ['Alexanderstr 3', '10178 Berlin', 'Germany']
          },
          categories: [
            {
              id: '4bf58dd8d48988d1c4941735',
              name: 'Restaurant',
              pluralName: 'Restaurants',
              shortName: 'Restaurant',
              icon: {
                prefix: 'https://ss3.4sqi.net/img/categories_v2/food/default_',
                suffix: '.png'
              },
              primary: true
            }
          ],
          verified: false,
          stats: {
            tipCount: 0,
            usersCount: 0,
            checkinsCount: 0,
            visitsCount: 0
          },
          beenHere: {
            count: 0,
            lastCheckinExpiredAt: 0,
            marked: false,
            unconfirmedCount: 0
          },
          hereNow: { count: 0, summary: 'Nobody here', groups: [] },
          referralId: 'v-1560963206',
          venueChains: [],
          hasPerk: false
        },
        {
          id: '53c52a62498edd44cd2992e5',
          name: 'secret lunch place',
          contact: {},
          location: {
            lat: 52.52440325982844,
            lng: 13.405269659111534,
            labeledLatLngs: [
              {
                label: 'display',
                lat: 52.52440325982844,
                lng: 13.405269659111534
              }
            ],
            cc: 'DE',
            neighborhood: 'Mitte',
            city: 'Berlin',
            state: 'Berlin',
            country: 'Germany',
            formattedAddress: ['Berlin', 'Germany']
          },
          categories: [
            {
              id: '4bf58dd8d48988d163941735',
              name: 'Park',
              pluralName: 'Parks',
              shortName: 'Park',
              icon: {
                prefix:
                  'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_',
                suffix: '.png'
              },
              primary: true
            }
          ],
          verified: false,
          stats: {
            tipCount: 0,
            usersCount: 0,
            checkinsCount: 0,
            visitsCount: 0
          },
          beenHere: {
            count: 0,
            lastCheckinExpiredAt: 0,
            marked: false,
            unconfirmedCount: 0
          },
          hereNow: { count: 0, summary: 'Nobody here', groups: [] },
          referralId: 'v-1560963206',
          venueChains: [],
          hasPerk: false
        }
      ],
      geocode: {
        what: '',
        where: 'berlin',
        feature: {
          cc: 'DE',
          name: 'Berlin',
          displayName: 'Berlin, Germany',
          matchedName: 'Berlin, Germany',
          highlightedName: '<b>Berlin</b>, Germany',
          woeType: 7,
          slug: 'berlin',
          id: 'geonameid:2950159',
          longId: '72057594040878095',
          geometry: {
            center: { lat: 52.52437, lng: 13.41053 },
            bounds: {
              ne: { lat: 52.675075983544005, lng: 13.757081929101975 },
              sw: { lat: 52.33858497674041, lng: 13.088542091271195 }
            }
          }
        },
        parents: []
      }
    }
  };

  it('should watch Home Sagas', () => {
    const gen = mainSaga();
    expect(gen.next().value).toEqual(all([fork(homeSaga)]));
  });

  it('should dispatch action "SEARCH_VENUES_SUCCESS" with result ', () => {
    const result = mockData;
    (<jest.Mock>searchVenues).mockImplementationOnce(() => result);

    const gen = searchVenuesAction({ params: { a: 1 } });
    expect(gen.next().value).toEqual(call(searchVenues, { a: 1 }));
    expect(gen.next(result).value).toEqual(
      put(searchVenuesSuccess(result.response.venues))
    );
  });

  it('should dispatch action "SEARCH_VENUES_FAILURE" with error', () => {
    const gen = searchVenuesAction({ params: { a: 1 } });
    expect(gen.next().value).toEqual(call(searchVenues, { a: 1 }));
    expect(gen.throw && gen.throw(new Error()).value).toEqual(
      put(searchVenuesFailure(new Error()))
    );
  });
});
